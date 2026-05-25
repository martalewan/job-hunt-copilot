import { FiBookmark, FiMapPin } from 'react-icons/fi';
import type { Job } from '../types/job';
import { getMatchScore } from '../utils/estimateMatchScore';

type JobCardProps = {
    job: Job;
    selected?: boolean;
    onSelect: () => void;
};

export function JobCard({ job, selected, onSelect }: JobCardProps) {
    const descriptionLabel = job.descriptionType === 'preview' ? 'Preview' : 'Full';
    const score = getMatchScore(job);

    return (
        <button
            onClick={onSelect}
            className={`
        group relative w-full rounded-md p-4 text-left transition-all
        ${selected
                    ? 'accent-control'
                    : 'glass-panel hover:border-[var(--color-aster-blue-line)]'
                }
      `}
        >
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="muted text-xs font-medium">
                            {job.company}
                        </p>

                        <h2 className="mt-1 text-sm font-semibold text-white line-clamp-2">
                            {job.title}
                        </h2>
                    </div>

                    <div className="flex shrink-0 flex-col items-end text-right">
                        <span className="badge-accent rounded-full px-2 py-1 text-[10px] font-semibold uppercase">
                            {job.status}
                        </span>

                        <p className="badge-accent mt-1 rounded-full px-2 py-1 text-[10px] font-semibold">
                            {score}% match
                        </p>
                    </div>
                </div>

                <p className="muted mt-2 flex items-center gap-1 text-xs">
                    <FiMapPin className="h-3 w-3" />
                    {job.location}
                    {job.remote && ' • Remote'}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="badge rounded-md px-2 py-1 text-[10px] font-semibold">
                        {job.source ?? 'Unknown'}
                    </span>

                    <span
                        className="badge rounded-md px-2 py-1 text-[10px] font-semibold"
                    >
                        {descriptionLabel}
                    </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                        {job.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="badge rounded-md px-2 py-1 text-[10px] font-medium"
                            >
                                {tag}
                            </span>
                        ))}

                        {job.tags.length > 3 && (
                            <span className="badge rounded-md px-2 py-1 text-[10px] font-medium">
                                +{job.tags.length - 3}
                            </span>
                        )}
                    </div>

                    <FiBookmark className="muted h-4 w-4 shrink-0 transition group-hover:text-white" />
                </div>
            </div>
        </button>
    );
}
