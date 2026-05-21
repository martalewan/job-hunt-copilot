import type { Job, JobStatus } from '../types/job';

type JobActionsProps = {
    job: Job;
    onStatusChange: (id: string, status: JobStatus) => void;
    onArchive: (id: string) => void;
    onRestore: (id: string) => void;
};

export function JobActions({
    job,
    onStatusChange,
    onArchive,
    onRestore,
}: JobActionsProps) {
    return (
        <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                Actions
            </p>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    onClick={() => onStatusChange(job.id, 'interested')}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                    Interested
                </button>

                <button
                    onClick={() => onStatusChange(job.id, 'applied')}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                    Applied
                </button>

                <button
                    onClick={() => onStatusChange(job.id, 'rejected')}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                    Rejected
                </button>

                {job.archived ? (
                    <button
                        onClick={() => onRestore(job.id)}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                    >
                        Restore
                    </button>
                ) : (
                    <button
                        onClick={() => onArchive(job.id)}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition hover:bg-white/10"
                    >
                        Archive
                    </button>
                )}

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
    );
}