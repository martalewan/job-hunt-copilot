import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

router.post('/summary', async (req, res) => {
    try {
        const { company, jobTitle, description } = req.body;

        if (!company) {
            return res.status(400).json({
                message: 'Missing company',
            });
        }

        const prompt = `
Write a short company summary for a job seeker.

Company: ${company}
Related job title: ${jobTitle || 'Not provided'}
Job description context: ${description || 'Not provided'}

Requirements:
- 2 short sentences max
- Explain what the company does
- Clear, professional, factual
- No hype
- Do not invent specific funding, size, or numbers
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return res.json({
            summary: response.text,
        });
    } catch (error) {
        console.error('Company summary error:', error);

        return res.status(500).json({
            message: 'Failed to generate company summary',
        });
    }
});

export default router;