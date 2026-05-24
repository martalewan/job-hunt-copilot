import { useState } from 'react';
import type { Job } from '../types/job';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/api/letters`;

export function useJobAiTools(job: Job) {
    const [letter, setLetter] = useState('');
    const [recruiterMessage, setRecruiterMessage] = useState('');
    const [jobAnalysis, setJobAnalysis] = useState('');

    const [isLetterOpen, setIsLetterOpen] = useState(false);
    const [isRecruiterMessageOpen, setIsRecruiterMessageOpen] = useState(false);
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

    const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
    const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    async function generateLetter() {
        try {
            setIsGeneratingLetter(true);

            const response = await fetch(`${API_URL}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: job.title,
                    company: job.company,
                    location: job.location,
                    skills: job.tags.join(', '),
                    motivation:
                        'I enjoy building modern frontend applications and creating excellent user experiences.',
                }),
            });

            const data = await response.json();

            setLetter(data.letter);
            setIsLetterOpen(true);
        } finally {
            setIsGeneratingLetter(false);
        }
    }

    async function generateRecruiterMessage() {
        try {
            setIsGeneratingMessage(true);

            const response = await fetch(`${API_URL}/recruiter-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: job.title,
                    company: job.company,
                    location: job.location,
                    skills: job.tags.join(', '),
                }),
            });

            const data = await response.json();

            setRecruiterMessage(data.message);
            setIsRecruiterMessageOpen(true);
        } finally {
            setIsGeneratingMessage(false);
        }
    }

    async function analyzeJob() {
        try {
            setIsAnalyzing(true);

            const response = await fetch(`${API_URL}/analyze-job`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: job.title,
                    company: job.company,
                    location: job.location,
                    skills: job.tags.join(', '),
                    url: job.url,
                }),
            });

            const data = await response.json();

            setJobAnalysis(data.analysis);
            setIsAnalysisOpen(true);
        } finally {
            setIsAnalyzing(false);
        }
    }

    return {
        letter,
        recruiterMessage,
        jobAnalysis,

        isLetterOpen,
        setIsLetterOpen,
        isRecruiterMessageOpen,
        setIsRecruiterMessageOpen,
        isAnalysisOpen,
        setIsAnalysisOpen,

        isGeneratingLetter,
        isGeneratingMessage,
        isAnalyzing,

        generateLetter,
        generateRecruiterMessage,
        analyzeJob,
    };
}