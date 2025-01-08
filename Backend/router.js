const express = require('express');
const router = express.Router();
const LangflowClient = require('./LangFlowClient');

const langflowClient = new LangflowClient(
    'https://api.langflow.astra.datastax.com',
    'AstraCS:pmloexBUnsRqhbqXyONUAOtg:29a842326ba5bdcd0981611d99add83e71ba1e3c5b1cd4024323b28fdd5e3747'
);

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const flowIdOrName = 'ae599132-587e-466d-957c-cced86f617b7';
        const langflowId = 'b3b0b7ee-b77c-4c7f-a366-995e954e58be';
        const tweaks = {
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

        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            message,
            'chat',
            'chat',
            tweaks,
            false
        );
        if (response?.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
            return res.json({ 
                reply: response.outputs[0].outputs[0].results.message.text 
            });
        }
        
        res.status(500).json({ error: 'Invalid response format' });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to process message',
            details: error.message 
        });
    }
});

module.exports = router;