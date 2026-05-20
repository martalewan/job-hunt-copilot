import type { Job } from '../types/job';

export const mockJobs: Job[] = [
    {
        id: '1',
        title: 'Frontend Developer React TypeScript',
        company: 'Doctolib',
        location: 'Paris, France',
        remote: false,
        tags: ['React', 'TypeScript', 'CSS'],
        url: 'https://example.com',
        status: 'new',
    },
    {
        id: '2',
        title: 'Remote Frontend Engineer',
        company: 'European Startup',
        location: 'Remote Europe',
        remote: true,
        tags: ['React', 'TypeScript', 'Next.js'],
        url: 'https://example.com',
        status: 'interested',
    },
];