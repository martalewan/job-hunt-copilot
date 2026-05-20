import type { Job, JobStatus } from '../types/job';

type JobCardProps = {
    job: Job;
    onStatusChange: (id: string, status: JobStatus) => void;
    onArchive: (id: string) => void;
};

export function JobCard({
    job,
    onStatusChange,
    onArchive,
}: JobCardProps) {
    return (
        <article className="group rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-slate-400">
                        {job.company}
                    </p>

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

                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur-md">
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

            <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                    Set the status
                </p>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={() =>
                            onStatusChange(job.id, 'interested')
                        }
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                    >
                        Interested
                    </button>

                    <button
                        onClick={() =>
                            onStatusChange(job.id, 'applied')
                        }
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                    >
                        Applied
                    </button>

                    <button
                        onClick={() =>
                            onStatusChange(job.id, 'rejected')
                        }
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                    >
                        Rejected
                    </button>

                    <button
                        onClick={() => onArchive(job.id)}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition hover:bg-white/10"
                    >
                        Archive
                    </button>

                    <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                    >
                        Open →
                    </a>
                </div>
            </div>
        </article>
    );
}