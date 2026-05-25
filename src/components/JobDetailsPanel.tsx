import { useState } from 'react';

import type { Job } from '../types/job';

import { Panel } from './Panel';
import { JobDetailsHeader } from './JobDetailsHeader';
import { JobDetailsTabs } from './JobDetailsTabs';
import { JobOverview } from './JobOverview';
import { JobAiAssistant } from './JobAiAssistant';
import { JobNotesCard } from './JobNotesCard';
import { JobDocumentsTab } from './JobDocumentsTab';

type Props = {
    job: Job | null;
    handleSaveLetter: (id: string, generatedLetter: string) => void;
    handleSaveNotes: (id: string, notes: string) => void;
    handleSaveRecruiterMessage: (id: string, generatedRecruiterMessage: string) => void;
    handleSaveJobAnalysis: (id: string, jobAnalysis: string) => void;
};

export function JobDetailsPanel({ job, handleSaveLetter, handleSaveNotes, handleSaveRecruiterMessage, handleSaveJobAnalysis }: Props) {
    const [activeTab, setActiveTab] =
        useState<'Overview' | 'Description' | 'Company' | 'Notes' | 'Documents' | 'Activity'>(
            'Overview'
        );

    if (!job) {
        return (
            <Panel className="h-full">
                Select a job
            </Panel>
        );
    }

    const description = formatDescription(job.description, job.descriptionType);

    return (
        <div className="glass-panel h-full overflow-y-auto rounded-md p-5">
            <JobDetailsHeader job={job} />

            <JobDetailsTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="mt-5 grid grid-cols-[1fr_320px] gap-5">
                <div>
                    {activeTab === 'Overview' && (
                        <JobOverview job={job} />
                    )}

                    {activeTab === 'Description' && (
                        <Panel>
                            {job.descriptionType === 'preview' && (
                                <div className="badge-accent mb-4 rounded-md p-3">
                                    <p className="text-xs font-medium uppercase tracking-wide">
                                        Preview only
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-white/75">
                                        This source only provides a short search excerpt, not the full job description.
                                    </p>
                                </div>
                            )}

                            <p className="muted whitespace-pre-line text-sm leading-6">
                                {description || 'No description available from this source yet.'}
                            </p>

                            <a
                                className="accent-text mt-4 inline-flex text-sm font-medium hover:text-white"
                                href={job.url}
                                rel="noreferrer"
                                target="_blank"
                            >
                                Open full job post
                            </a>
                        </Panel>
                    )}

                    {activeTab === 'Company' && (
                        <Panel>
                            <h3>{job.company}</h3>
                            <p>{job.companyWebsite}</p>
                        </Panel>
                    )}

                    {activeTab === 'Notes' && (
                        <JobNotesCard
                            notes={job.notes}
                            onSaveNotes={(notes: string) => handleSaveNotes(job.id, notes)}
                        />
                    )}

                    {activeTab === 'Documents' && (
                        <JobDocumentsTab job={job} />
                    )}

                    {activeTab === 'Activity' && (
                        <Panel>Application history</Panel>
                    )}
                </div>

                <JobAiAssistant job={job} onSaveLetter={handleSaveLetter} onSaveRecruiterMessage={handleSaveRecruiterMessage} onSaveJobAnalysis={handleSaveJobAnalysis} />
            </div>
        </div>
    );
}

function formatDescription(
    description: string | undefined,
    type: Job['descriptionType']
) {
    const text = (description ?? '').trim();

    if (type !== 'preview') return text;

    return cleanPreviewStart(text);
}

function cleanPreviewStart(text: string) {
    if (!text) return text;

    const withoutDanglingIntro = text.replace(
        /^[a-z][^.?!]{0,90}[.?!]\s+(?=[A-ZÀ-ÖØ-Þ])/,
        ''
    );

    return withoutDanglingIntro || text;
}
