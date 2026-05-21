import type { ScrapedJob } from '../sources/englishJobs';

function normalize(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .trim();
}

export function dedupeJobs(jobs: ScrapedJob[]) {
    const seen = new Set<string>();

    return jobs.filter((job) => {
        const key = [
            normalize(job.title),
            normalize(job.company),
            normalize(job.location),
        ].join('-');

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
}