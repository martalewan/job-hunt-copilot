import { FiBookmark, FiMapPin } from 'react-icons/fi';
import type { Job } from '../types/job';

type JobCardProps = {
    job: Job;
    selected?: boolean;
    onSelect: () => void;
};

export function JobCard({ job, selected, onSelect }: JobCardProps) {
    const descriptionLabel = job.descriptionType === 'preview' ? 'Preview' : 'Full';
    const score = job.matchScore ?? 0;

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
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-white/80">
                            {job.company}
                        </p>

                        <h2 className="mt-1 text-sm font-semibold text-white line-clamp-2">
                            {job.title}
                        </h2>
                    </div>

                    <div className="flex shrink-0 flex-col items-end text-right">
                        <span className="rounded-full bg-violet-500/15 px-2 py-1 text-[10px] font-semibold uppercase text-violet-300">
                            {job.status}
                        </span>

                        <p className="mt-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-200">
                            {score}% match
                        </p>
                    </div>
                </div>

                <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                    <FiMapPin className="h-3 w-3" />
                    {job.location}
                    {job.remote && ' • Remote'}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-md border border-sky-300/15 bg-sky-300/10 px-2 py-1 text-[10px] font-semibold text-sky-100">
                        {job.source ?? 'Unknown'}
                    </span>

                    <span
                        className={`rounded-md border px-2 py-1 text-[10px] font-semibold ${
                            job.descriptionType === 'preview'
                                ? 'border-amber-300/20 bg-amber-300/10 text-amber-100'
                                : 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100'
                        }`}
                    >
                        {descriptionLabel}
                    </span>
                </div>

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
