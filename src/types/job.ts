export type JobStatus = 'new' | 'interested' | 'applied' | 'rejected';

export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    remote: boolean;
    tags: string[];
    url: string;
    status: JobStatus;
    archived: boolean;
};