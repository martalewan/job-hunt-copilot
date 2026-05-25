import type { Job, JobStatus } from '../types/job';
import { Panel } from './Panel';

type JobActivityTabProps = {
    job: Job;
    onUpdateJob: (id: string, patch: Partial<Job>) => void;
};

const statuses: { label: string; value: JobStatus }[] = [
    { label: 'New', value: 'new' },
    { label: 'Interested', value: 'interested' },
    { label: 'Applied', value: 'applied' },
    { label: 'Rejected', value: 'rejected' },
];

export function JobActivityTab({ job, onUpdateJob }: JobActivityTabProps) {
    const markStatus = (status: JobStatus) => {
        const now = new Date().toISOString();

        onUpdateJob(job.id, {
            status,
            archived: false,
            updatedAt: now,
            appliedAt: status === 'applied' ? job.appliedAt ?? now : undefined,
        });
    };

    const toggleArchived = () => {
        onUpdateJob(job.id, {
            archived: !job.archived,
            updatedAt: new Date().toISOString(),
        });
    };

    const events = buildEvents(job);

    return (
        <div className="space-y-4">
            <Panel>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Application State
                        </h3>
                        <p className="muted mt-1 text-sm">
                            Move this job through your pipeline.
                        </p>
                    </div>

                    <span className={`status-chip ${job.archived ? 'status-archived' : `status-${job.status}`} rounded-full px-3 py-1 text-xs font-medium`}>
                        {job.archived ? 'Archived' : labelForStatus(job.status)}
                    </span>
                </div>

                <div className="mt-5 grid grid-cols-4 gap-2">
                    {statuses.map((status) => {
                        const active = !job.archived && job.status === status.value;

                        return (
                            <button
                                key={status.value}
                                onClick={() => markStatus(status.value)}
                                className={`status-chip status-${status.value} rounded-md px-3 py-2 text-xs font-medium transition ${
                                    active ? '' : 'opacity-65'
                                }`}
                            >
                                {status.label}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={toggleArchived}
                    className={`status-chip status-archived mt-3 w-full rounded-md px-3 py-2 text-xs font-medium transition ${
                        job.archived ? '' : 'opacity-75'
                    }`}
                >
                    {job.archived ? 'Restore from archive' : 'Archive job'}
                </button>
            </Panel>

            <Panel>
                <h3 className="text-sm font-semibold text-white">
                    Activity
                </h3>

                <div className="mt-4 space-y-3">
                    {events.map((event) => (
                        <div
                            key={`${event.label}-${event.value}`}
                            className="flex items-start gap-3"
                        >
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--color-aster-blue)]" />

                            <div>
                                <p className="text-sm font-medium text-white">
                                    {event.label}
                                </p>
                                <p className="faint mt-0.5 text-xs">
                                    {event.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
}

function buildEvents(job: Job) {
    const events = [
        {
            label: `Status set to ${labelForStatus(job.status)}`,
            value: formatDate(job.updatedAt) ?? 'Current state',
        },
    ];

    if (job.appliedAt) {
        events.push({
            label: 'Application submitted',
            value: formatDate(job.appliedAt) ?? job.appliedAt,
        });
    }

    if (job.archived) {
        events.unshift({
            label: 'Archived',
            value: formatDate(job.updatedAt) ?? 'Archived recently',
        });
    }

    if (job.postedAt) {
        events.push({
            label: 'Job posted',
            value: formatDate(job.postedAt) ?? job.postedAt,
        });
    }

    return events;
}

function labelForStatus(status: JobStatus) {
    switch (status) {
        case 'new':
            return 'New';
        case 'interested':
            return 'Interested';
        case 'applied':
            return 'Applied';
        case 'rejected':
            return 'Rejected';
        default:
            return status;
    }
}

function formatDate(value?: string) {
    if (!value) return undefined;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return undefined;

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
}
