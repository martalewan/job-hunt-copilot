import { FiBookmark, FiMapPin } from 'react-icons/fi';
import type { Job } from '../../types/job';

type JobCardProps = {
    job: Job;
    selected?: boolean;
    onSelect: () => void;
};

export function JobCard({ job, selected, onSelect }: JobCardProps) {
    return (
        <button
            onClick={onSelect}
            className={`
        group relative w-full rounded-xl border p-4 text-left transition-all
        ${selected
                    ? 'border-violet-500 bg-violet-500/10'
                    : 'border-white/10 bg-[#090b1a] hover:border-violet-400/60'
                }
      `}
        >
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium text-white/80">
                            {job.company}
                        </p>

                        <h2 className="mt-1 text-sm font-semibold text-white">
                            {job.title}
                        </h2>
                    </div>

                    <div className="flex flex-col items-start text-right">
                        <span className="rounded-full bg-violet-500/15 px-2 py-1 text-[10px] font-semibold uppercase text-violet-300">
                            {job.status}
                        </span>

                        <p className="mt-1 text-[10px] text-slate-400">
                            2d ago
                        </p>
                    </div>
                </div>

                <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                    <FiMapPin className="h-3 w-3" />
                    {job.location}
                    {job.remote && ' • Remote'}
                </p>

                <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                        {job.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium text-slate-200"
                            >
                                {tag}
                            </span>
                        ))}

                        {job.tags.length > 3 && (
                            <span className="rounded-md bg-white/10 px-2 py-1 text-[10px] font-medium text-slate-200">
                                +{job.tags.length - 3}
                            </span>
                        )}
                    </div>

                    <FiBookmark className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-white" />
                </div>
            </div>
        </button>
    );
}