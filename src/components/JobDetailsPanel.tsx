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
};

export function JobDetailsPanel({ job, handleSaveLetter, handleSaveNotes }: Props) {
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

    return (
        <div className="h-full overflow-y-auto rounded-sm border border-white/10 bg-[#080d18] p-5">
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
                        <Panel>{job.description}</Panel>
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

                <JobAiAssistant job={job} onSaveLetter={handleSaveLetter} />
            </div>
        </div>
    );
}