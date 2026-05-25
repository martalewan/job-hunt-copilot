import type { Job } from '../types/job';

type HomePageProps = {
    jobs: Job[];
};

export function HomePage({ jobs }: HomePageProps) {
    const activeJobs = jobs.filter((job) => !job.archived);
    const appliedJobs = jobs.filter((job) => job.status === 'applied');
    const interestedJobs = jobs.filter((job) => job.status === 'interested');

    return (
        <section className="glass-panel h-full overflow-y-auto rounded-md p-6">
            <div>
                <p className="faint text-sm uppercase tracking-[0.2em]">
                    Dashboard
                </p>

                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
                    Home
                </h1>

                <p className="muted mt-3 text-sm">
                    Track your job search progress and focus on your next best move.
                </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
                <StatCard label="Active Jobs" value={activeJobs.length} />
                <StatCard label="Applied" value={appliedJobs.length} />
                <StatCard label="Interested" value={interestedJobs.length} />
            </div>

            <div className="glass-panel mt-8 rounded-md p-5">
                <h2 className="text-lg font-semibold text-white">
                    Today’s Focus
                </h2>

                <p className="muted mt-2 text-sm">
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
        <div className="glass-panel rounded-md p-5">
            <p className="muted text-sm">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
    );
}
