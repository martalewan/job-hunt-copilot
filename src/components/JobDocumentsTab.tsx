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
                        <p className="mt-1 text-xs text-slate-500">
                            AI-generated content saved for this job.
                        </p>
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                        {documents.length}
                    </span>
                </div>

                <div className="mt-5 space-y-3">
                    {documents.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-5">
                            <p className="text-sm text-slate-400">
                                No saved documents yet.
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Generate a motivation letter, recruiter message, or job analysis.
                            </p>
                        </div>
                    ) : (
                        documents.map((doc) => (
                            <button
                                key={doc.title}
                                onClick={() => setSelectedDocument(doc)}
                                className="
                  group w-full rounded-2xl
                  border border-white/10
                  bg-white/[0.04]
                  p-4 text-left
                  transition
                  hover:border-cyan-400/30
                  hover:bg-cyan-400/[0.06]
                "
                            >
                                <div className="flex items-start gap-4">
                                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
                                        <FiFileText className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-medium text-white">
                                                    {doc.title}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate-500">
                                                    {doc.label}
                                                </p>
                                            </div>

                                            <FiArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-cyan-200" />
                                        </div>

                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
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