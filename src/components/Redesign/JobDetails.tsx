import { Panel } from './Panel';
import { AIActionCard } from './AIActionCard';
import { MatchScoreCard } from './MatchScoreCard';
import type { Job } from '../../types/job';

type JobDetailsPanelProps = {
    job: Job | null;
};

export function JobDetailsPanel({ job }: JobDetailsPanelProps) {
    if (!job) {
        return (
            <Panel className="h-full">
                <p className="text-slate-400">Select a job to view details.</p>
            </Panel>
        );
    }

    return (
        <div className="space-y-4">
            <Panel>
                <p className="text-slate-400">{job.company}</p>

                <h2 className="mt-2 text-3xl font-semibold">{job.title}</h2>

                <p className="mt-3 text-slate-400">
                    {job.location} {job.remote ? '• Remote' : ''}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </Panel>

            <div className="grid grid-cols-2 gap-4">
                <MatchScoreCard score={84} />

                <Panel>
                    <p className="text-sm text-slate-400">AI Assistant</p>

                    <div className="mt-4 space-y-3">
                        <AIActionCard
                            title="Generate Letter"
                            description="Create a tailored motivation letter."
                            onClick={() => { }}
                        />

                        <AIActionCard
                            title="Recruiter Message"
                            description="Write a short outreach message."
                            onClick={() => { }}
                        />

                        <AIActionCard
                            title="Analyze Job Fit"
                            description="Understand strengths and gaps."
                            onClick={() => { }}
                        />
                    </div>
                </Panel>
            </div>
        </div>
    );
}