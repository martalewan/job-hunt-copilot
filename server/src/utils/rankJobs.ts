type RankableJob = {
    title?: string;
    company?: string;
    location?: string;
    tags?: string[];
    description?: string;
    descriptionType?: 'full' | 'preview';
    remote?: boolean;
    source?: string;
    matchScore?: number;
};

const strongRoleTerms = [
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
    'nuxt',
];

const weakRoleTerms = [
    'fullstack',
    'full-stack',
    'full stack',
    'software engineer',
    'web developer',
    'developpeur web',
    'développeur web',
];

const negativeTerms = [
    'backend',
    'back-end',
    'back end',
    'devops',
    'data engineer',
    'qa engineer',
    'sales',
    'product designer',
    'administrator',
];

export function rankJobs<T extends RankableJob>(jobs: T[]): T[] {
    return jobs
        .map((job) => ({
            ...job,
            matchScore: scoreJob(job),
        }))
        .sort((a, b) => {
            const scoreDiff = (b.matchScore ?? 0) - (a.matchScore ?? 0);
            if (scoreDiff !== 0) return scoreDiff;

            return sourceWeight(b.source) - sourceWeight(a.source);
        });
}

function scoreJob(job: RankableJob): number {
    const title = normalize(job.title);
    const company = normalize(job.company);
    const location = normalize(job.location);
    const tags = normalize((job.tags ?? []).join(' '));
    const description = normalize(job.description);
    const allText = `${title} ${tags} ${description}`;

    let score = 35;

    score += strongRoleTerms.reduce(
        (total, term) => total + weightedIncludes(title, term, 12),
        0
    );
    score += strongRoleTerms.reduce(
        (total, term) => total + weightedIncludes(tags, term, 6),
        0
    );
    score += strongRoleTerms.reduce(
        (total, term) => total + weightedIncludes(description, term, 2),
        0
    );

    score += weakRoleTerms.reduce(
        (total, term) => total + weightedIncludes(title, term, 4),
        0
    );

    score -= negativeTerms.reduce((total, term) => {
        if (!allText.includes(term)) return total;
        return total + (title.includes(term) ? 14 : 5);
    }, 0);

    if (location.includes('paris')) score += 12;
    if (location.includes('hauts de seine') || location.includes('la defense')) {
        score += 7;
    }
    if (location.includes('france')) score += 4;
    if (job.remote) score += 3;
    if (job.descriptionType === 'full') score += 6;
    if (company && company !== 'company not found') score += 3;

    return Math.max(0, Math.min(100, Math.round(score)));
}

function weightedIncludes(value: string, term: string, weight: number): number {
    return value.includes(term) ? weight : 0;
}

function sourceWeight(source: string | undefined): number {
    switch (source) {
        case 'France Travail':
            return 4;
        case 'Jooble':
            return 3;
        case 'EnglishJobs':
        case 'RemoteOK':
        case 'Remotive':
            return 2;
        default:
            return 1;
    }
}

function normalize(value: unknown): string {
    return String(value || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
}
