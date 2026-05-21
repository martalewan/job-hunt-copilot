import {
    FiArrowLeft,
    FiBookmark,
    FiExternalLink,
    FiMapPin,
    FiBriefcase,
    FiCalendar,
    FiMoreHorizontal,
    FiCheck,
} from 'react-icons/fi';

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
        <div className="h-full overflow-y-auto rounded-sm border border-white/10 bg-[#080d18] p-5">
            <div className="mb-6 flex items-start justify-between">
                <button className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                    <FiArrowLeft />
                </button>

                <div className="flex gap-2">
                    <button className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
                        <FiExternalLink />
                        Open Job
                    </button>

                    <button className="rounded-lg bg-white/5 p-2 text-slate-300 hover:bg-white/10">
                        <FiBookmark />
                    </button>

                    <button className="rounded-lg bg-white/5 p-2 text-slate-300 hover:bg-white/10">
                        <FiMoreHorizontal />
                    </button>
                </div>
            </div>

            <div className="flex gap-5">


                <div>
                    <p className="text-sm text-slate-300">{job.company}</p>

                    <h1 className="mt-1 text-3xl font-semibold text-white">
                        {job.title}
                    </h1>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span className="inline-flex items-center gap-1">
                            <FiMapPin />
                            {job.location}
                        </span>

                        {job.remote && <span>• Remote</span>}


                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-white/10 px-3 py-1 text-xs text-slate-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-5 flex gap-8 border-b border-white/10 text-xs text-slate-400">
                {['Overview', 'Job Description', 'Company', 'Notes', 'Activity'].map(
                    (tab, index) => (
                        <button
                            key={tab}
                            className={`pb-3 ${index === 0
                                ? 'border-b-2 border-violet-400 text-violet-300'
                                : 'hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    )
                )}
            </div>

            <div className="mt-5 grid grid-cols-[1fr_330px] gap-5">
                <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-4">
                        <MatchScoreCard score={84} />

                        <Panel>
                            <h3 className="text-sm font-semibold text-white">
                                Top Strengths
                            </h3>

                            <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                {['React', 'TypeScript', 'Frontend Architecture', 'UI/UX Design'].map(
                                    (item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <FiCheck className="text-emerald-400" />
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>
                        </Panel>

                        <Panel>
                            <h3 className="text-sm font-semibold text-white">
                                Missing Skills
                            </h3>

                            <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                {['GraphQL', 'Jest / Testing', 'AWS', 'Accessibility'].map(
                                    (item) => (
                                        <li key={item} className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>
                        </Panel>
                    </div>

                    <Panel>
                        <h3 className="text-sm font-semibold text-white">Job Summary</h3>

                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Spotify is looking for a Frontend Engineer to build delightful,
                            high-performance user experiences. You will work with modern
                            technologies and collaborate with cross-functional teams.
                        </p>

                        <div className="mt-5 grid grid-cols-4 gap-4 text-xs text-slate-400">
                            <Info icon={<FiBriefcase />} label="Experience" value="3–5 years" />
                            <Info icon={<FiBriefcase />} label="Employment" value="Full-time" />
                            <Info icon={<FiMapPin />} label="Location" value={job.location} />
                            <Info icon={<FiCalendar />} label="Posted" value="5 days ago" />
                        </div>
                    </Panel>

                    <Panel>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">Notes</h3>

                            <button className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white">
                                Edit
                            </button>
                        </div>

                        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-400">
                            <li>Applied with tailored resume</li>
                            <li>Follow up in 1 week</li>
                            <li>Mentioned React + TypeScript experience</li>
                        </ul>
                    </Panel>
                </div>

                <Panel>
                    <h3 className="text-sm font-semibold text-white">AI Assistant</h3>

                    <div className="mt-4 space-y-3">
                        <AIActionCard
                            title="Generate Motivation Letter"
                            description="Create a personalized letter for this position."
                            onClick={() => { }}
                        />

                        <AIActionCard
                            title="Write Recruiter Message"
                            description="Generate a message to reach out."
                            onClick={() => { }}
                        />

                        <AIActionCard
                            title="Interview Questions"
                            description="Get possible interview questions."
                            onClick={() => { }}
                        />

                        <AIActionCard
                            title="Analyze Job Fit"
                            description="Detailed analysis of your fit."
                            onClick={() => { }}
                        />
                    </div>
                </Panel>
            </div>
        </div>
    );
}

function Info({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-slate-500">{icon}</span>
            <div>
                <p className="text-[11px] text-slate-500">{label}</p>
                <p className="font-medium text-white">{value}</p>
            </div>
        </div>
    );
}