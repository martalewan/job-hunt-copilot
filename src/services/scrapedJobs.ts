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
};

export async function fetchScrapedJobs(): Promise<Job[]> {
    const response = await fetch(
        `${API_BASE_URL}/api/jobs`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch jobs');
    }

    const data = await response.json();

    return data.jobs.map(
        (job: ApiJob, index: number) => ({
            ...job,
            id: `${job.id}-${index}`,
            status: 'new',
            archived: false,
        })
    );
}
