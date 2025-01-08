const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const LangflowClient = require('./LangFlowClient');

dotenv.config();

const io = new Server(server, {
    cors: {
        origin: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});

const LANGFLOW_API_URL = process.env.LANGFLOW_API_URL;
const ASTRA_TOKEN = process.env.ASTRA_TOKEN;
const FLOW_ID = process.env.FLOW_ID;
const LANGFLOW_ID = process.env.LANGFLOW_ID;

if (!LANGFLOW_API_URL || !ASTRA_TOKEN || !FLOW_ID || !LANGFLOW_ID) {
    throw new Error('Missing required environment variables');
}

const langflowClient = new LangflowClient(LANGFLOW_API_URL, ASTRA_TOKEN);

const DEFAULT_TWEAKS = {
    "ChatInput-oSiGG": {},
    "ChatOutput-fmaeT": {},
    "ParseData-RIATW": {},
    "GoogleGenerativeAIModel-eL2F9": {},
    "Google Generative AI Embeddings-9RAZb": {},
    "AstraDB-pQREj": {},
    "Prompt-hGxwM": {},
    "File-8Yti4": {},
    "SplitText-N5Vvc": {},
    "AstraDB-vBL8E": {},
    "Google Generative AI Embeddings-5O2My": {}
};

const activeConnections = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    activeConnections.set(socket.id, { connectedAt: new Date() });

    socket.on('chat_message', async (message) => {
        try {
            // Emit typing indicator
            socket.emit('bot_typing', true);

            const response = await langflowClient.runFlow(
                FLOW_ID,
                LANGFLOW_ID,
                message,
                'chat',
                'chat',
                DEFAULT_TWEAKS,
                false
            );

            if (!response?.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
                throw new Error('Invalid response format from Langflow service');
            }

            // Stop typing indicator
            socket.emit('bot_typing', false);

            // Emit the response
            socket.emit('bot_response', {
                reply: response.outputs[0].outputs[0].results.message.text,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Chat processing error:', error);
            
            let errorMessage = {
                error: 'Failed to process message',
                details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            };

            if (error.response?.status === 401) {
                errorMessage = {
                    error: 'Authentication failed',
                    details: 'Invalid or expired API token'
                };
            } else if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
                errorMessage = {
                    error: 'Service unavailable',
                    details: 'Unable to connect to Langflow service'
                };
            }

            socket.emit('error', errorMessage);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        activeConnections.delete(socket.id);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server with Socket.IO
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server Running on ${port}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});