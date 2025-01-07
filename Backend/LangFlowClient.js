class LangflowClient {
    constructor(baseURL, applicationToken, options = {}) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
        this.timeout = options.timeout || 30000; // Default 30 second timeout
        this.retryAttempts = options.retryAttempts || 3; // Default 3 retry attempts
        this.retryDelay = options.retryDelay || 1000; // Default 1 second delay between retries
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async post(endpoint, body, headers = {"Content-Type": "application/json"}) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        headers["Content-Type"] = "application/json";
        const url = `${this.baseURL}${endpoint}`;

        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                const responseMessage = await response.json();
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
                }
                return responseMessage;
            } catch (error) {
                const isLastAttempt = attempt === this.retryAttempts;
                const isAbortError = error.name === 'AbortError';
                const timeoutMessage = isAbortError ? 'Request timed out' : error.message;
                
                console.error(`Attempt ${attempt}/${this.retryAttempts} failed:`, timeoutMessage);

                if (isLastAttempt) {
                    throw new Error(`Failed after ${this.retryAttempts} attempts: ${timeoutMessage}`);
                }

                // Wait before retrying
                await this.sleep(this.retryDelay * attempt); // Exponential backoff
            }
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { 
            input_value: inputValue, 
            input_type: inputType, 
            output_type: outputType, 
            tweaks: tweaks 
        });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        const eventSource = new EventSource(streamUrl);
        const timeoutId = setTimeout(() => {
            eventSource.close();
            onError(new Error('Stream connection timed out'));
        }, this.timeout);

        eventSource.onmessage = event => {
            // Reset timeout on each message
            clearTimeout(timeoutId);
            try {
                const data = JSON.parse(event.data);
                onUpdate(data);
            } catch (error) {
                console.error('Error parsing stream data:', error);
                onError(error);
                eventSource.close();
            }
        };

        eventSource.onerror = event => {
            clearTimeout(timeoutId);
            console.error('Stream Error:', event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            clearTimeout(timeoutId);
            onClose('Stream closed');
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false, onUpdate, onClose, onError) {
        try {
            const initResponse = await this.initiateSession(
                flowIdOrName, 
                langflowId, 
                inputValue, 
                inputType, 
                outputType, 
                stream, 
                tweaks
            );
            
            console.log('Init Response:', initResponse);
            
            if (stream && 
                initResponse?.outputs?.[0]?.outputs?.[0]?.artifacts?.stream_url) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
                console.log(`Streaming from: ${streamUrl}`);
                return this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            if (onError) onError(error);
            throw error;
        }
    }
}

module.exports = LangflowClient;