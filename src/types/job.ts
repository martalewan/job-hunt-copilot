export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    remote: boolean;
    tags: string[];
    url: string;
    status: 'new' | 'interested' | 'applied' | 'rejected';
};