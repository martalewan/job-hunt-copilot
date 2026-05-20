import type { Job } from '../types/job';

type JobCardProps = {
    job: Job;
};

export function JobCard({ job }: JobCardProps) {
    return (
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="mt-1 text-slate-400">{job.company}</p>
                </div>

                <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
                    {job.status}
                </span>
            </div>

            <p className="mt-4 text-slate-300">{job.location}</p>

            <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <a
                href={job.url}
                target="_blank"
                className="mt-5 inline-block rounded-xl bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-400"
            >
                View job
            </a>
        </article>
    );
}