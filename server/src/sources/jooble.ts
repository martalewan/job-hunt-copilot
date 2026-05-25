import type { ScrapedJob } from './englishJobs';
import { cleanText } from '../utils/cleanText';

type JoobleJob = {
    id?: string | number;
    title?: string;
    company?: string;
    location?: string;
    link?: string;
    snippet?: string;
    updated?: string;
    type?: string;
};

type JoobleResponse = {
    jobs?: JoobleJob[];
};

export async function scrapeJooble(): Promise<ScrapedJob[]> {
    const apiKey = process.env.JOOBLE_API_KEY;

    if (!apiKey) {
        console.warn('Jooble skipped: missing JOOBLE_API_KEY');
        return [];
    }

    const pages = 7;
    const perPage = 50;

    const results = await Promise.all(
        Array.from({ length: pages }, (_, index) =>
            fetchJooblePage(apiKey, index + 1, perPage)
        )
    );

    return results.flat();
}

async function fetchJooblePage(
    apiKey: string,
    page: number,
    perPage: number
): Promise<ScrapedJob[]> {
    const response = await fetch(`https://fr.jooble.org/api/${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            keywords: 'frontend',
            location: 'Paris',
            radius: '40',
            page: String(page),
            ResultOnPage: String(perPage),
            companysearch: 'false',
        }),
    });

    if (!response.ok) {
        throw new Error(`Jooble failed with ${response.status}`);
    }

    const data = (await response.json()) as JoobleResponse;

    return (data.jobs ?? [])
        .filter((job) => job.title && job.link)
        .map((job) => ({
            id: `jooble-${job.id ?? job.link}`,
            title: job.title ?? '',
            company: job.company || 'Company not found',
            location: job.location || 'Paris',
            remote: isRemote(job),
            tags: ['Frontend', 'Jooble', job.type ?? ''].filter(Boolean),
            url: job.link ?? '',
            description: cleanText(job.snippet ?? ''),
            descriptionType: 'preview',
            postedAt: job.updated,
            source: 'Jooble',
        }));
}

function isRemote(job: JoobleJob): boolean {
    const text = `${job.title ?? ''} ${job.location ?? ''} ${job.snippet ?? ''}`.toLowerCase();
    return text.includes('remote') || text.includes('télétravail');
}
