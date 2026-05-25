import type { Job } from '../types/job';

const strongTerms = [
    'frontend',
    'front-end',
    'front end',
    'react',
    'vue',
    'angular',
    'typescript',
    'javascript',
    'next.js',
    'nextjs',
];

const negativeTerms = [
    'backend',
    'back-end',
    'back end',
    'devops',
    'sales',
    'designer',
];

export function getMatchScore(job: Job): number {
    if (typeof job.matchScore === 'number') {
        return job.matchScore;
    }

    const title = normalize(job.title);
    const tags = normalize(job.tags.join(' '));
    const location = normalize(job.location);
    const description = normalize(job.description);
    const allText = `${title} ${tags} ${description}`;

    let score = 45;

    for (const term of strongTerms) {
        if (title.includes(term)) score += 10;
        if (tags.includes(term)) score += 5;
        if (description.includes(term)) score += 2;
    }

    for (const term of negativeTerms) {
        if (allText.includes(term)) score -= title.includes(term) ? 12 : 5;
    }

    if (location.includes('paris')) score += 10;
    if (job.remote) score += 3;

    return Math.max(35, Math.min(95, Math.round(score)));
}

function normalize(value?: string): string {
    return (value ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
}
