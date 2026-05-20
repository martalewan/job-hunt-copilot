import type { Job } from '../types/job';

type SidebarStatsProps = {
    jobs: Job[];
};

export function SidebarStats({ jobs }: SidebarStatsProps) {
    const applied = jobs.filter(
        (job) => !job.archived && job.status === 'applied'
    ).length;

    const interested = jobs.filter(
        (job) => !job.archived && job.status === 'interested'
    ).length;

    const rejected = jobs.filter(
        (job) => !job.archived && job.status === 'rejected'
    ).length;

    return (
        <div className="mt-auto border-t border-white/10 pt-6">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                Stats
            </p>

            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Applied</span>
                    <span className="text-white">{applied}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Interested</span>
                    <span className="text-white">{interested}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Rejected</span>
                    <span className="text-white">{rejected}</span>
                </div>
            </div>
        </div>
    );
}