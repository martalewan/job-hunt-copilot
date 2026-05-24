import type { Job } from "../types/job";

type View = 'all' | 'interested' | 'applied' | 'rejected' | 'archived';

type FilterChipsProps = {
    activeView: string;
    setActiveView: (view: string) => void;
    jobs: Job[];
};

const filters: { label: string; value: View }[] = [
    { label: 'All', value: 'all' },
    { label: 'Interested', value: 'interested' },
    { label: 'Applied', value: 'applied' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Archived', value: 'archived' },
];

export function FilterChips({
    activeView,
    setActiveView,
    jobs,
}: FilterChipsProps) {
    function getCount(value: View) {
        if (value === 'archived') {
            return jobs.filter((job) => job.archived).length;
        }

        if (value === 'all') {
            return jobs.filter((job) => !job.archived).length;
        }

        return jobs.filter(
            (job) => !job.archived && job.status === value
        ).length;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
                const active = activeView === filter.value;

                return (
                    <button
                        key={filter.value}
                        onClick={() => setActiveView(filter.value)}
                        className={`cursor-pointer rounded-md border px-2 py-2 text-[0.7rem] transition ${active
                            ? 'border-violet-400/40 bg-violet-500/20 text-white'
                            : 'border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                            }`}
                    >
                        {filter.label}
                        <span className="ml-1 text-[0.7rem] opacity-70">
                            {getCount(filter.value)}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}