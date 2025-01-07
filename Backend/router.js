const express = require('express');
const router = express.Router();
const LangflowClient = require('./LangFlowClient');

const langflowClient = new LangflowClient(
    'https://api.langflow.astra.datastax.com',
    'AstraCS:SsHHRFpReegTBFfgnCCyQJJG:0da877e7b859b709f5f5c25ae2470f512b9e630df7b47677cc40b185c98a1236'
);

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const flowIdOrName = 'a935abb5-e941-43fc-8299-45603f3d71a8';
        const langflowId = '54ce131f-1fbd-4d8c-a787-35c2e8a16fac';
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