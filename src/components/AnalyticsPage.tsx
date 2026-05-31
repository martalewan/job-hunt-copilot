import { useMemo } from 'react';
import type { Job, JobStatus } from '../types/job';
import { getMatchScore } from '../utils/estimateMatchScore';

type AnalyticsPageProps = {
    jobs: Job[];
};

type BreakdownItem = {
    label: string;
    value: number;
    className?: string;
};

const statusLabels: Record<JobStatus, string> = {
    new: 'New',
    interested: 'Interested',
    applied: 'Applied',
    rejected: 'Rejected',
};

export function AnalyticsPage({ jobs }: AnalyticsPageProps) {
    const analytics = useMemo(() => {
        const activeJobs = jobs.filter((job) => !job.archived);
        const appliedJobs = activeJobs.filter((job) => job.status === 'applied');
        const interestedJobs = activeJobs.filter((job) => job.status === 'interested');
        const fullDescriptions = activeJobs.filter((job) => job.descriptionType === 'full').length;
        const previewDescriptions = activeJobs.filter((job) => job.descriptionType === 'preview').length;

        return {
            activeJobs,
            appliedJobs,
            interestedJobs,
            averageScore: average(activeJobs.map(getMatchScore)),
            fullDescriptions,
            previewDescriptions,
            pipeline: [
                { label: 'New', value: countStatus(activeJobs, 'new'), className: 'status-new' },
                { label: 'Interested', value: interestedJobs.length, className: 'status-interested' },
                { label: 'Applied', value: appliedJobs.length, className: 'status-applied' },
                { label: 'Rejected', value: countStatus(activeJobs, 'rejected'), className: 'status-rejected' },
                { label: 'Archived', value: jobs.filter((job) => job.archived).length, className: 'status-archived' },
            ],
            sources: topBreakdown(
                activeJobs.map((job) => job.source || 'Unknown'),
                6
            ),
            skills: topBreakdown(
                activeJobs.flatMap((job) => job.tags || []),
                8
            ),
            bestMatches: [...activeJobs]
                .sort((a, b) => getMatchScore(b) - getMatchScore(a))
                .slice(0, 5),
        };
    }, [jobs]);

    return (
        <section className="glass-panel h-full overflow-y-auto rounded-md p-6">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <p className="faint text-sm uppercase tracking-[0.2em]">
                        Analytics
                    </p>

                    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
                        Job Search Dashboard
                    </h1>

                    <p className="muted mt-3 max-w-2xl text-sm">
                        See where your pipeline stands, which sources are working, and which jobs look strongest.
                    </p>
                </div>

                <span className="badge-accent rounded-full px-4 py-2 text-sm font-medium">
                    {analytics.activeJobs.length} active jobs
                </span>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-3">
                <MetricCard label="Average match" value={`${analytics.averageScore}%`} />
                <MetricCard label="Applied" value={analytics.appliedJobs.length} />
                <MetricCard label="Interested" value={analytics.interestedJobs.length} />
                <MetricCard
                    label="Full descriptions"
                    value={`${percentage(analytics.fullDescriptions, analytics.activeJobs.length)}%`}
                />
            </div>

            <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-4">
                <AnalyticsPanel title="Pipeline">
                    <BreakdownList items={analytics.pipeline} total={jobs.length || 1} />
                </AnalyticsPanel>

                <AnalyticsPanel title="Description Quality">
                    <BreakdownList
                        items={[
                            { label: 'Full descriptions', value: analytics.fullDescriptions },
                            { label: 'Preview only', value: analytics.previewDescriptions },
                            {
                                label: 'Missing',
                                value: analytics.activeJobs.length - analytics.fullDescriptions - analytics.previewDescriptions,
                            },
                        ]}
                        total={analytics.activeJobs.length || 1}
                    />
                </AnalyticsPanel>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <AnalyticsPanel title="Sources">
                    <BreakdownList items={analytics.sources} total={analytics.activeJobs.length || 1} />
                </AnalyticsPanel>

                <AnalyticsPanel title="Top Skills">
                    <div className="flex flex-wrap gap-2">
                        {analytics.skills.map((skill) => (
                            <span
                                key={skill.label}
                                className="badge rounded-md px-3 py-2 text-xs font-medium"
                            >
                                {skill.label}
                                <span className="faint ml-2">{skill.value}</span>
                            </span>
                        ))}
                    </div>
                </AnalyticsPanel>
            </div>

            <AnalyticsPanel title="Best Opportunities" className="mt-4">
                <div className="space-y-2">
                    {analytics.bestMatches.map((job) => (
                        <div
                            key={job.id}
                            className="glass-control grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-md p-3"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white">
                                    {job.title}
                                </p>
                                <p className="muted mt-0.5 truncate text-xs">
                                    {job.company} - {job.location}
                                </p>
                            </div>

                            <span className={`status-chip status-${job.status} rounded-full px-3 py-1 text-xs font-medium`}>
                                {statusLabels[job.status]}
                            </span>

                            <span className="badge-accent rounded-full px-3 py-1 text-xs font-semibold">
                                {getMatchScore(job)}%
                            </span>
                        </div>
                    ))}
                </div>
            </AnalyticsPanel>
        </section>
    );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="glass-panel rounded-md p-5">
            <p className="muted text-sm">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
    );
}

function AnalyticsPanel({
    title,
    children,
    className = '',
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`glass-panel rounded-md p-5 ${className}`}>
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            <div className="mt-4">{children}</div>
        </div>
    );
}

function BreakdownList({ items, total }: { items: BreakdownItem[]; total: number }) {
    return (
        <div className="space-y-3">
            {items.map((item) => (
                <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                        <span className="muted">{item.label}</span>
                        <span className={`text-xs font-medium ${item.className ? `status-chip ${item.className} rounded-full px-2 py-0.5` : 'faint'}`}>
                            {item.value}
                        </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                            className="h-full rounded-full bg-[var(--color-aster-blue)]"
                            style={{ width: `${percentage(item.value, total)}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

function countStatus(jobs: Job[], status: JobStatus) {
    return jobs.filter((job) => job.status === status).length;
}

function topBreakdown(values: string[], limit: number): BreakdownItem[] {
    const counts = new Map<string, number>();

    values
        .map((value) => value.trim())
        .filter(Boolean)
        .forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));

    return [...counts.entries()]
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(([label, value]) => ({ label, value }));
}

function average(values: number[]) {
    if (values.length === 0) return 0;
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function percentage(value: number, total: number) {
    if (total <= 0) return 0;
    return Math.round((value / total) * 100);
}
