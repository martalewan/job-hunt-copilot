import {
    FiBookmark,
    FiExternalLink,
    FiMapPin,
    FiMoreHorizontal,
} from 'react-icons/fi';

import type { Job } from '../types/job';

type Props = {
    job: Job;
};

export function JobDetailsHeader({ job }: Props) {
    return (
        <>
            <div className="mb-6 flex items-start justify-between">
                <div className="flex gap-2">
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="accent-control inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs"
                    >
                        <FiExternalLink />
                        Open Job
                    </a>

                    <button className="glass-control rounded-md p-2">
                        <FiBookmark />
                    </button>

                    <button className="glass-control rounded-md p-2">
                        <FiMoreHorizontal />
                    </button>
                </div>
            </div>

            <div>
                <p className="muted text-sm">{job.company}</p>

                <h1 className="mt-1 text-3xl font-semibold text-white">
                    {job.title}
                </h1>

                <div className="muted mt-2 flex items-center gap-3 text-sm">
                    <span className="inline-flex items-center gap-1">
                        <FiMapPin />
                        {job.location}
                    </span>

                    {job.remote && <span>• Remote</span>}
                    <span>• {job.status}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <span
                            key={tag}
                            className="badge rounded-md px-3 py-1 text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
