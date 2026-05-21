import type { Job } from '../types/job';

export async function generateMotivationLetter(
    job: Job,
    skills: string,
    motivation: string
): Promise<{ letter: string }> {
    const response = await fetch('http://localhost:5001/api/letters/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobTitle: job.title,
            company: job.company,
            location: job.location,
            skills,
            motivation,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate letter');
    }

    return response.json();
}