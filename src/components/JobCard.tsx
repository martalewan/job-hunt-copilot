import { useState } from 'react';
import type { Job, JobStatus } from '../types/job';
import { Modal } from './Modal';

type JobCardProps = {
    job: Job;
    onStatusChange: (id: string, status: JobStatus) => void;
    onArchive: (id: string) => void;
    onRestore: (id: string) => void;
};

export function JobCard({
    job,
    onStatusChange,
    onArchive,
    onRestore,
}: JobCardProps) {
    const [letter, setLetter] = useState('');
    const [isLetterOpen, setIsLetterOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const [recruiterMessage, setRecruiterMessage] = useState('');
    const [isRecruiterMessageOpen, setIsRecruiterMessageOpen] = useState(false);
    const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

    async function generateRecruiterMessage() {
        try {
            setIsGeneratingMessage(true);

            const response = await fetch(
                'http://localhost:4000/api/letters/recruiter-message',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jobTitle: job.title,
                        company: job.company,
                        location: job.location,
                        skills: job.tags.join(', '),
                    }),
                }
            );

            const data = await response.json();

            setRecruiterMessage(data.message);
            setIsRecruiterMessageOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGeneratingMessage(false);
        }
    }

    async function generateLetter() {
        try {
            setIsGenerating(true);

            const response = await fetch(
                'http://localhost:4000/api/letters/generate',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jobTitle: job.title,
                        company: job.company,
                        location: job.location,
                        skills: job.tags.join(', '),
                        motivation:
                            'I enjoy building modern frontend applications and creating excellent user experiences.',
                    }),
                }
            );

            const data = await response.json();

            setLetter(data.letter);
            setIsLetterOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    }

    async function copyLetter() {
        await navigator.clipboard.writeText(letter);
    }

    return (
        <>
            <article className="group rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-slate-400">{job.company}</p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                            {job.title}
                        </h2>

                        <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
                            <span>{job.location}</span>

                            {job.remote && (
                                <>
                                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                                    <span>Remote</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {job.status}
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Actions
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => onStatusChange(job.id, 'interested')}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                        >
                            Interested
                        </button>

                        <button
                            onClick={() => onStatusChange(job.id, 'applied')}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                        >
                            Applied
                        </button>

                        <button
                            onClick={() => onStatusChange(job.id, 'rejected')}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                        >
                            Rejected
                        </button>

                        {job.archived ? (
                            <button
                                onClick={() => onRestore(job.id)}
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                            >
                                Restore
                            </button>
                        ) : (
                            <button
                                onClick={() => onArchive(job.id)}
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition hover:bg-white/10"
                            >
                                Archive
                            </button>
                        )}

                        <a
                            href={job.url}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-auto rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                        >
                            Open →
                        </a>
                    </div>
                </div>

                <div className="mt-6 border-t border-white/5 pt-5">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        AI Tools
                    </p>
                    <div className='flex gap-3'>
                        <button
                            onClick={generateLetter}
                            disabled={isGenerating}
                            className="
                                inline-flex items-center gap-2
                                rounded-2xl
                                border border-cyan-500/20
                                bg-cyan-500/10
                                px-4 py-2.5
                                text-sm font-medium
                                text-cyan-200
                                backdrop-blur-xl
                                transition-all duration-300
                                hover:border-cyan-400/30
                                hover:bg-cyan-500/15
                                disabled:opacity-50
                                "
                        >
                            {isGenerating
                                ? 'Generating...'
                                : '✨ Generate AI Letter'}
                        </button>
                        <button
                            onClick={generateRecruiterMessage}
                            disabled={isGeneratingMessage}
                            className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-200 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/15 disabled:opacity-50"
                        >
                            {isGeneratingMessage ? 'Generating...' : '💬 Recruiter Message'}
                        </button>
                    </div>
                </div>

            </article>

            <Modal
                title="Recruiter Message"
                content={recruiterMessage}
                isOpen={isRecruiterMessageOpen}
                onClose={() => setIsRecruiterMessageOpen(false)}
                maxWidth="md"
            />

            <Modal
                title="AI Motivation Letter"
                content={letter}
                isOpen={isLetterOpen}
                onClose={() => setIsLetterOpen(false)}
                maxWidth="lg"
            />
        </>
    );
}