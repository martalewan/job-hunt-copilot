import { API_BASE_URL } from '../config/api';
import type { Job } from '../types/job';

type ApiJob = {
    id: string;
    title: string;
    company: string;
    location: string;
    remote: boolean;
    tags: string[];
    url: string;
    description?: string;
    descriptionType?: 'full' | 'preview';
    postedAt?: string;
    salaryMin?: number;
    salaryMax?: number;
    source?: string;
    matchScore?: number;
};

export type ScrapedJobsMeta = {
    cached: boolean;
    cachedAt?: string;
    sourceCounts?: Record<string, number>;
    total?: number;
};

export async function fetchScrapedJobs(options: {
    refresh?: boolean;
    keywords?: string;
    location?: string;
    target?: number;
} = {}): Promise<{
    jobs: Job[];
    meta?: ScrapedJobsMeta;
}> {
    const url = new URL(`${API_BASE_URL}/api/jobs`);
    if (options.refresh) {
        url.searchParams.set('refresh', 'true');
    }
    if (options.keywords) {
        url.searchParams.set('query', options.keywords);
    }
    if (options.location) {
        url.searchParams.set('location', options.location);
    }
    if (options.target) {
        url.searchParams.set('target', String(options.target));
    }

    const response = await fetch(
        url
    );

    if (!response.ok) {
        throw new Error('Failed to fetch jobs');
    }

    const data = await response.json();

    return {
        jobs: data.jobs.map(
            (job: ApiJob, index: number) => ({
                ...job,
                id: `${job.id}-${index}`,
                status: 'new',
                archived: false,
            })
        ),
        meta: data.meta,
    };
}
