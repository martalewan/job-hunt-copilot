export type SavedSearch = {
    id: string;
    name: string;
    keywords: string;
    location: string;
    target: number;
    lastRunAt?: string;
    lastResultCount?: number;
};

export type SearchRun = {
    id: string;
    searchId: string;
    searchName: string;
    runAt: string;
    resultCount: number;
    newJobs: number;
    cached: boolean;
};
