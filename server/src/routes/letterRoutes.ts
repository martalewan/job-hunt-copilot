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

export default router;