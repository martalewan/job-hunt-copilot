import type { Job, JobStatus } from '../types/job';
import { JobActions } from './JobActions';
import { JobAiTools } from './JobAiTools';

type JobCardProps = {
    job: Job;
    onStatusChange: (id: string, status: JobStatus) => void;
    onArchive: (id: string) => void;
    onRestore: (id: string) => void;
};

export function JobCard({
    job,
    onStatusChange,
    onArchive,
    onRestore,
}: JobCardProps) {
    return (
        <article className="group rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-slate-400">{job.company}</p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        {job.title}
                    </h2>

                    <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
                        <span>{job.location}</span>

                        {job.remote && (
                            <>
                                <span className="h-1 w-1 rounded-full bg-slate-500" />
                                <span>Remote</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {job.status}
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <JobActions
                job={job}
                onStatusChange={onStatusChange}
                onArchive={onArchive}
                onRestore={onRestore}
            />

            <JobAiTools job={job} />
        </article>
    );
}