import type { Job } from '../../types/job';
import { JobCard } from './JobCard';

type JobListProps = {
    jobs: Job[];
    selectedJobId?: string;
    onSelectJob: (job: Job) => void;
};

export function JobList({
    jobs,
    selectedJobId,
    onSelectJob,
}: JobListProps) {
    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    selected={job.id === selectedJobId}
                    onSelect={() => onSelectJob(job)}
                />
            ))}
        </div>
    );
}