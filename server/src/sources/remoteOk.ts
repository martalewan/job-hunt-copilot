import type { ScrapedJob } from './englishJobs';
import { cleanText } from '../utils/cleanText';

type RemoteOkJob = {
    id?: number;
    position?: string;
    company?: string;
    location?: string;
    tags?: string[];
    description?: string;
    date?: string;
    apply_url?: string;
    salary_min?: number;
    salary_max?: number;
    url?: string;
};

export async function scrapeRemoteOk(): Promise<ScrapedJob[]> {
    const response = await fetch(
        'https://remoteok.com/api',
        {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        }
    );

    const data = (await response.json()) as RemoteOkJob[];

    return data
        .filter((job) => {
            if (!job.position) return false;

            const text = [
                job.position,
                job.tags?.join(' '),
                cleanText(job.description ?? ''),
            ]
                .join(' ')
                .toLowerCase();

            return (
                text.includes('frontend') ||
                text.includes('front-end') ||
                text.includes('react') ||
                text.includes('typescript') ||
                text.includes('javascript')
            );
        })
        .map((job) => ({
            id: `remoteok-${job.id}`,
            title: job.position ?? '',
            company: job.company ?? 'Unknown',
            location: job.location ?? 'Remote',
            remote: true,
            tags: job.tags ?? ['Remote'],
            url: job.url ?? job.apply_url ?? '',
            description: cleanText(job.description ?? ''),
            descriptionType: 'full',
            postedAt: job.date,
            salaryMin: job.salary_min,
            salaryMax: job.salary_max,
            source: 'RemoteOK',
        }));
}
