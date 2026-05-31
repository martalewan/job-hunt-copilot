import { useMemo } from 'react';
import type { Job } from '../types/job';
import { getMatchScore } from '../utils/estimateMatchScore';

type HomePageProps = {
    jobs: Job[];
};

export function HomePage({ jobs }: HomePageProps) {
    const stats = useMemo(() => {
        const activeJobs = jobs.filter((job) => !job.archived);
        const appliedJobs = jobs.filter((job) => job.status === 'applied');
        const interestedJobs = jobs.filter((job) => job.status === 'interested');
        const rejectedJobs = jobs.filter((job) => job.status === 'rejected');
        const bestJobs = [...activeJobs]
            .sort((a, b) => getMatchScore(b) - getMatchScore(a))
            .slice(0, 3);

        return {
            activeJobs,
            appliedJobs,
            interestedJobs,
            rejectedJobs,
            bestJobs,
            averageScore: average(activeJobs.map(getMatchScore)),
            pipelineTotal: Math.max(activeJobs.length, 1),
        };
    }, [jobs]);

    return (
        <section className="glass-panel h-full overflow-y-auto rounded-md p-6">
            <div className="glass-panel animate-rise relative overflow-hidden rounded-md p-7">
                <div className="home-hero-orbit" />

                <div className="relative max-w-3xl">
                    <p className="faint text-sm uppercase tracking-[0.2em]">
                        Dashboard
                    </p>

                    <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white">
                        Your search, at a glance.
                    </h1>

                    <p className="muted mt-4 max-w-xl text-sm leading-6">
                        Track your strongest opportunities, move jobs through the pipeline, and keep momentum on applications.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="badge-accent rounded-full px-3 py-1 text-xs font-medium">
                            {stats.activeJobs.length} active jobs
                        </span>
                        <span className="badge rounded-full px-3 py-1 text-xs font-medium">
                            {stats.averageScore}% average match
                        </span>
                    </div>
                </div>
            </div>

            <div className="animate-rise-delay mt-4 grid grid-cols-4 gap-4">
                <StatCard label="Active Jobs" value={stats.activeJobs.length} />
                <StatCard label="Interested" value={stats.interestedJobs.length} />
                <StatCard label="Applied" value={stats.appliedJobs.length} />
                <StatCard label="Rejected" value={stats.rejectedJobs.length} />
            </div>

            <div className="mt-4 grid grid-cols-[0.9fr_1.1fr] gap-4">
                <div className="glass-panel rounded-md p-5">
                    <h2 className="text-sm font-semibold text-white">
                        Pipeline
                    </h2>

                    <div className="mt-5 space-y-4">
                        <PipelineBar
                            label="Interested"
                            value={stats.interestedJobs.length}
                            total={stats.pipelineTotal}
                            className="status-interested"
                        />
                        <PipelineBar
                            label="Applied"
                            value={stats.appliedJobs.length}
                            total={stats.pipelineTotal}
                            className="status-applied"
                        />
                        <PipelineBar
                            label="Rejected"
                            value={stats.rejectedJobs.length}
                            total={stats.pipelineTotal}
                            className="status-rejected"
                        />
                    </div>
                </div>

                <div className="glass-panel rounded-md p-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-white">
                            Best Opportunities
                        </h2>
                        <span className="faint text-xs">Top match scores</span>
                    </div>

                    <div className="mt-4 space-y-2">
                        {stats.bestJobs.length > 0 ? (
                            stats.bestJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="glass-control rounded-md p-3"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-white">
                                                {job.title}
                                            </p>
                                            <p className="muted mt-0.5 truncate text-xs">
                                                {job.company} - {job.location}
                                            </p>
                                        </div>

                                        <span className="badge-accent shrink-0 rounded-full px-3 py-1 text-xs font-semibold">
                                            {getMatchScore(job)}%
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="faint text-sm">
                                Import jobs to see your strongest matches here.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="glass-panel mt-4 rounded-md p-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-sm font-semibold text-white">
                            Today’s Focus
                        </h2>
                        <p className="muted mt-2 text-sm">
                            Review interested roles, apply to your strongest matches, and keep notes fresh.
                        </p>
                    </div>

                    <span className="badge rounded-full px-3 py-1 text-xs font-medium">
                        {stats.interestedJobs.length || stats.bestJobs.length} to review
                    </span>
                </div>
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
        <div className="glass-panel rounded-md p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-aster-blue-line)]">
            <p className="muted text-sm">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
    );
}

function PipelineBar({
    label,
    value,
    total,
    className,
}: {
    label: string;
    value: number;
    total: number;
    className: string;
}) {
    const width = Math.max(4, Math.round((value / total) * 100));

    return (
        <div>
            <div className="mb-2 flex items-center justify-between text-sm">
                <span className="muted">{label}</span>
                <span className={`status-chip ${className} rounded-full px-2 py-0.5 text-xs font-medium`}>
                    {value}
                </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div
                    className={`animated-bar h-full rounded-full ${className}`}
                    style={{
                        width: `${width}%`,
                        background: 'var(--status-color)',
                    }}
                />
            </div>
        </div>
    );
}

function average(values: number[]) {
    if (values.length === 0) return 0;
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
