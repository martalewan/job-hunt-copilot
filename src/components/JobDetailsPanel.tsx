import { useEffect, useState } from 'react';

import type { Job } from '../types/job';

import { Panel } from './Panel';
import { JobDetailsHeader } from './JobDetailsHeader';
import { JobDetailsTabs } from './JobDetailsTabs';
import { JobOverview } from './JobOverview';
import { JobAiAssistant } from './JobAiAssistant';
import { JobNotesCard } from './JobNotesCard';
import { JobDocumentsTab } from './JobDocumentsTab';
import { fetchCompanySummary } from '../services/fetchCompanySummary';

type Props = {
    job: Job | null;
    handleSaveLetter: (id: string, generatedLetter: string) => void;
    handleSaveNotes: (id: string, notes: string) => void;
    handleSaveRecruiterMessage: (id: string, generatedRecruiterMessage: string) => void;
    handleSaveJobAnalysis: (id: string, jobAnalysis: string) => void;
    handleSaveCompanySummary: (id: string, companySummary: string) => void;
};

export function JobDetailsPanel({
    job,
    handleSaveLetter,
    handleSaveNotes,
    handleSaveRecruiterMessage,
    handleSaveJobAnalysis,
    handleSaveCompanySummary,
}: Props) {
    const [activeTab, setActiveTab] =
        useState<'Overview' | 'Description' | 'Company' | 'Notes' | 'Documents' | 'Activity'>('Overview');

    const [companySummary, setCompanySummary] = useState('');
    const [isGeneratingCompanySummary, setIsGeneratingCompanySummary] = useState(false);

    useEffect(() => {
        setCompanySummary(job?.companySummary ?? '');
    }, [job?.id, job?.companySummary]);

    const handleGenerateCompanySummary = async () => {
        if (!job) return;

        try {
            setIsGeneratingCompanySummary(true);

            const summary = await fetchCompanySummary({
                company: job.company,
                jobTitle: job.title,
                description: job.description,
            });

            setCompanySummary(summary);
            handleSaveCompanySummary(job.id, summary);
        } catch (error) {
            console.error('Company summary error:', error);
        } finally {
            setIsGeneratingCompanySummary(false);
        }
    };

    if (!job) {
        return <Panel className="h-full">Select a job</Panel>;
    }

    const description = formatDescription(job.description, job.descriptionType);

    return (
        <div className="glass-panel h-full overflow-y-auto rounded-md p-5">
            <JobDetailsHeader job={job} />

            <JobDetailsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-5 grid grid-cols-[1fr_320px] gap-5">
                <div>
                    {activeTab === 'Overview' && <JobOverview job={job} />}

                    {activeTab === 'Description' && (
                        <Panel>
                            <p className="muted whitespace-pre-line text-sm leading-6">
                                {description || 'No description available from this source yet.'}
                            </p>
                        </Panel>
                    )}

                    {activeTab === 'Company' && (
                        <Panel>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">
                                        {job.company}
                                    </h3>

                                    {job.companyWebsite && (
                                        <p className="muted mt-1 text-xs">
                                            {job.companyWebsite}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleGenerateCompanySummary}
                                    disabled={isGeneratingCompanySummary}
                                    className="accent-control rounded-md px-3 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isGeneratingCompanySummary ? 'Loading...' : 'Learn more'}
                                </button>
                            </div>

                            <div className="mt-4">
                                {isGeneratingCompanySummary ? (
                                    <p className="faint text-sm">Generating company summary...</p>
                                ) : companySummary ? (
                                    <p className="muted text-sm leading-6">{companySummary}</p>
                                ) : (
                                    <p className="faint text-sm">
                                        Click “Learn more” to generate a short company summary.
                                    </p>
                                )}
                            </div>
                        </Panel>
                    )}

                    {activeTab === 'Notes' && (
                        <JobNotesCard
                            notes={job.notes}
                            onSaveNotes={(notes: string) => handleSaveNotes(job.id, notes)}
                        />
                    )}

                    {activeTab === 'Documents' && <JobDocumentsTab job={job} />}

                    {activeTab === 'Activity' && <Panel>Application history</Panel>}
                </div>

                <JobAiAssistant
                    job={job}
                    onSaveLetter={handleSaveLetter}
                    onSaveRecruiterMessage={handleSaveRecruiterMessage}
                    onSaveJobAnalysis={handleSaveJobAnalysis}
                />
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
