import type { Job } from '../types/job';

type HomePageProps = {
    jobs: Job[];
};

export function HomePage({ jobs }: HomePageProps) {
    const activeJobs = jobs.filter((job) => !job.archived);
    const appliedJobs = jobs.filter((job) => job.status === 'applied');
    const interestedJobs = jobs.filter((job) => job.status === 'interested');

    return (
        <section className="h-full overflow-y-auto rounded-xs border border-white/10 bg-white/[0.03] p-6">
            <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Dashboard
                </p>

                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
                    Home
                </h1>

                <p className="mt-3 text-sm text-slate-400">
                    Track your job search progress and focus on your next best move.
                </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
                <StatCard label="Active Jobs" value={activeJobs.length} />
                <StatCard label="Applied" value={appliedJobs.length} />
                <StatCard label="Interested" value={interestedJobs.length} />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h2 className="text-lg font-semibold text-white">
                    Today’s Focus
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                    Review your saved jobs, follow up on applications, and use AI to improve your next application.
                </p>
            </div>
        </section>
    );
}

function StatCard({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
    );
}