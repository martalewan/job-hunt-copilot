import type { ScrapedJob } from './englishJobs';

type RemotiveJob = {
    id: number;
    title: string;
    company_name: string;
    candidate_required_location: string;
    url: string;
    tags: string[];
};

type RemotiveResponse = {
    jobs: RemotiveJob[];
};

export async function scrapeRemotive(): Promise<ScrapedJob[]> {
    const response = await fetch(
        'https://remotive.com/api/remote-jobs?category=software-dev'
    );

    const data = (await response.json()) as RemotiveResponse;

    console.log('Total Remotive jobs:', data.jobs.length);

    console.log(
        data.jobs.slice(0, 5).map((job) => ({
            title: job.title,
            company: job.company_name,
            location: job.candidate_required_location,
        }))
    );

    return data.jobs
        .filter((job) => {
            const text = `${job.title} ${job.candidate_required_location} ${job.tags.join(' ')}`.toLowerCase();

            const matchesRole =
                text.includes('frontend') ||
                text.includes('front-end') ||
                text.includes('react') ||
                text.includes('typescript');

            const matchesParisOrEurope =
                text.includes('paris') ||
                text.includes('france') ||
                text.includes('europe') ||
                text.includes('emea');

            return matchesRole && matchesParisOrEurope;
        })
        .map((job) => ({
            id: `remotive-${job.id}`,
            title: job.title,
            company: job.company_name,
            location: job.candidate_required_location,
            remote: true,
            tags: job.tags.length ? job.tags : ['Remote'],
            url: job.url,
        }));
}