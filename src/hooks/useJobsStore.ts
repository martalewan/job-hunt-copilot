import { useCallback, useState } from 'react';
import type { Job } from '../types/job';
import { useLocalStorage } from './useLocalStorage';

export function useJobsStore() {
    const [jobs, setJobs] = useLocalStorage<Job[]>('jobs', []);
    const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] ?? null);

    const updateJob = useCallback(
        (id: string, patch: Partial<Job>) => {
            setJobs((prevJobs) =>
                prevJobs.map((job) =>
                    job.id === id ? { ...job, ...patch } : job
                )
            );

            setSelectedJob((prevJob) =>
                prevJob?.id === id ? { ...prevJob, ...patch } : prevJob
            );
        },
        [setJobs]
    );

    const replaceJobs = useCallback(
        (nextJobs: Job[]) => {
            setJobs(nextJobs);
            setSelectedJob(nextJobs[0] ?? null);
        },
        [setJobs]
    );

    const saveLetter = useCallback(
        (id: string, generatedLetter: string) => {
            updateJob(id, { generatedLetter });
        },
        [updateJob]
    );

    const saveRecruiterMessage = useCallback(
        (id: string, generatedRecruiterMessage: string) => {
            updateJob(id, { generatedRecruiterMessage });
        },
        [updateJob]
    );

    const saveJobAnalysis = useCallback(
        (id: string, jobAnalysis: string) => {
            updateJob(id, { jobAnalysis });
        },
        [updateJob]
    );

    const saveNotes = useCallback(
        (id: string, notes: string) => {
            updateJob(id, { notes });
        },
        [updateJob]
    );

    const saveCompanySummary = useCallback(
        (id: string, companySummary: string) => {
            updateJob(id, { companySummary });
        },
        [updateJob]
    );

    return {
        jobs,
        selectedJob,
        setSelectedJob,
        replaceJobs,
        updateJob,
        saveLetter,
        saveRecruiterMessage,
        saveJobAnalysis,
        saveNotes,
        saveCompanySummary,
    };
}
