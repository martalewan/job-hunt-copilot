import { useState } from 'react';
import { FiFileText, FiArrowUpRight } from 'react-icons/fi';

import type { Job } from '../types/job';
import { Panel } from './Panel';
import { DocumentViewerModal } from './DocumentViewerModal';

type DocumentPreview = {
    title: string;
    label: string;
    content?: string;
};

type Props = {
    job: Job;
};

export function JobDocumentsTab({ job }: Props) {
    const [selectedDocument, setSelectedDocument] =
        useState<DocumentPreview | null>(null);

    const documents: DocumentPreview[] = [
        {
            title: 'Motivation Letter',
            label: 'Application document',
            content: job.generatedLetter,
        },
        {
            title: 'Recruiter Message',
            label: 'Outreach message',
            content: job.generatedRecruiterMessage,
        },
        {
            title: 'Job Analysis',
            label: 'AI job fit report',
            content: job.jobAnalysis,
        },
    ].filter((doc) => Boolean(doc.content));

    return (
        <>
            <Panel>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Saved Documents
                        </h3>
                        <p className="faint mt-1 text-xs">
                            AI-generated content saved for this job.
                        </p>
                    </div>

                    <span className="badge rounded-full px-3 py-1 text-xs">
                        {documents.length}
                    </span>
                </div>

                <div className="mt-5 space-y-3">
                    {documents.length === 0 ? (
                        <div className="glass-control rounded-md border-dashed p-5">
                            <p className="muted text-sm">
                                No saved documents yet.
                            </p>
                            <p className="faint mt-1 text-xs">
                                Generate a motivation letter, recruiter message, or job analysis.
                            </p>
                        </div>
                    ) : (
                        documents.map((doc) => (
                            <button
                                key={doc.title}
                                onClick={() => setSelectedDocument(doc)}
                                className="
                  glass-control group w-full rounded-md
                  p-4 text-left
                  transition
                "
                            >
                                <div className="flex items-start gap-4">
                                    <div className="badge-accent rounded-md p-3">
                                        <FiFileText className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-medium text-white">
                                                    {doc.title}
                                                </p>
                                                <p className="faint mt-0.5 text-xs">
                                                    {doc.label}
                                                </p>
                                            </div>

                                            <FiArrowUpRight className="faint h-4 w-4 shrink-0 transition group-hover:text-white" />
                                        </div>

                                        <p className="muted mt-3 line-clamp-3 text-sm leading-6">
                                            {doc.content}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </Panel>

            {selectedDocument?.content && (
                <DocumentViewerModal
                    title={selectedDocument.title}
                    content={selectedDocument.content}
                    isOpen
                    onClose={() => setSelectedDocument(null)}
                />
            )}
        </>
    );
}
