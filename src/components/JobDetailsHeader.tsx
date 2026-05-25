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
                        className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white"
                    >
                        <FiExternalLink />
                        Open Job
                    </a>

                    <button className="rounded-lg bg-white/5 p-2">
                        <FiBookmark />
                    </button>

                    <button className="rounded-lg bg-white/5 p-2">
                        <FiMoreHorizontal />
                    </button>
                </div>
            </div>

            <div>
                <p className="text-sm text-slate-300">{job.company}</p>

                <h1 className="mt-1 text-3xl font-semibold text-white">
                    {job.title}
                </h1>

                <div className="mt-2 flex items-center gap-3 text-sm text-slate-400">
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
                            className="rounded-md bg-white/10 px-3 py-1 text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
