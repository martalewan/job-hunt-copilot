import express from 'express';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

router.post('/generate', async (req, res) => {
    try {
        const {
            jobTitle,
            company,
            location,
            skills,
            motivation,
        } = req.body;

        const prompt = `
Write a professional motivation letter.

Candidate:
- Name: Marta Lewandowska
- Skills: ${skills}
- Motivation: ${motivation}

Job:
- Title: ${jobTitle}
- Company: ${company}
- Location: ${location}

Requirements:
- Sound human and professional
- Not generic
- Mention React, TypeScript and frontend development naturally
- No fake experience
- Around 300 words
- End with "Kind regards, Marta Lewandowska"
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.json({
            letter: response.text,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to generate letter',
        });
    }
});
router.post('/recruiter-message', async (req, res) => {
    try {
        const { jobTitle, company, location, skills } = req.body;

        if (!jobTitle || !company) {
            return res.status(400).json({
                message: 'Missing jobTitle or company',
            });
        }

        const prompt = `
Write a short LinkedIn recruiter message.

Candidate:
- Name: Marta Lewandowska
- Skills: ${skills || 'React, TypeScript, Tailwind CSS'}
- Looking for frontend roles in Paris or remote Europe

Job:
- Title: ${jobTitle}
- Company: ${company}
- Location: ${location || 'Not specified'}

Requirements:
- Friendly and professional
- Short, max 900 characters
- Not too formal
- No fake experience
- Mention React and TypeScript naturally
- End with "Best regards, Marta"
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return res.json({
            message: response.text,
        });
    } catch (error) {
        console.error('Recruiter message error:', error);

        return res.status(500).json({
            message: 'Failed to generate recruiter message',
        });
    }
});

export default router;