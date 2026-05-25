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
        <div className="flex flex-wrap gap-1.5">
            {filters.map((filter) => {
                const active = activeView === filter.value;

                return (
                    <button
                        key={filter.value}
                        onClick={() => setActiveView(filter.value)}
                        className={`cursor-pointer rounded-md px-2 py-1 text-[0.68rem] leading-4 transition ${active
                            ? 'accent-control'
                            : 'glass-control muted'
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
