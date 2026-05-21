import type { Job } from '../types/job';

const API_URL = 'http://localhost:4000/api/letters';

export async function generateLetter(
    job: Job,
    form: {
        skills: string;
        motivation: string;
        projects: string;
        tone: string;
        language: string;
    }
) {
    const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobTitle: job.title,
            company: job.company,
            location: job.location,
            ...form,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate letter');
    }

    return response.json();
}

export async function generateRecruiterMessage(job: Job) {
    const response = await fetch(`${API_URL}/recruiter-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobTitle: job.title,
            company: job.company,
            location: job.location,
            skills: job.tags.join(', '),
        }),
    });

    return response.json();
}

export async function analyzeJob(job: Job) {
    const response = await fetch(`${API_URL}/analyze-job`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobTitle: job.title,
            company: job.company,
            location: job.location,
            skills: job.tags.join(', '),
            url: job.url,
        }),
    });

    return response.json();
}