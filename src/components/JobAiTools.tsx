import { useState } from 'react';
import type { Job } from '../types/job';
import { Modal } from './Modal';

type JobAiToolsProps = {
    job: Job;
};

export function JobAiTools({ job }: JobAiToolsProps) {
    const [letter, setLetter] = useState('');
    const [isLetterOpen, setIsLetterOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const [recruiterMessage, setRecruiterMessage] = useState('');
    const [isRecruiterMessageOpen, setIsRecruiterMessageOpen] = useState(false);
    const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

    const [jobAnalysis, setJobAnalysis] = useState('');
    const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    async function analyzeJob() {
        try {
            setIsAnalyzing(true);

            const response = await fetch('http://localhost:4000/api/letters/analyze-job', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: job.title,
                    company: job.company,
                    location: job.location,
                    skills: job.tags.join(', '),
                    url: job.url,
                }),
            });

            const data = await response.json();

            setJobAnalysis(data.analysis);
            setIsAnalysisOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAnalyzing(false);
        }
    }

    async function generateRecruiterMessage() {
        try {
            setIsGeneratingMessage(true);

            const response = await fetch('http://localhost:4000/api/letters/recruiter-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: job.title,
                    company: job.company,
                    location: job.location,
                    skills: job.tags.join(', '),
                }),
            });

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

            const response = await fetch('http://localhost:4000/api/letters/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobTitle: job.title,
                    company: job.company,
                    location: job.location,
                    skills: job.tags.join(', '),
                    motivation:
                        'I enjoy building modern frontend applications and creating excellent user experiences.',
                }),
            });

            const data = await response.json();

            setLetter(data.letter);
            setIsLetterOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <>
            <div className="mt-6 border-t border-white/5 pt-5">
                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    AI Tools
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={generateLetter}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-200 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-500/15 disabled:opacity-50"
                    >
                        {isGenerating ? 'Generating...' : '✨ Generate AI Letter'}
                    </button>

                    <button
                        onClick={generateRecruiterMessage}
                        disabled={isGeneratingMessage}
                        className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-200 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/15 disabled:opacity-50"
                    >
                        {isGeneratingMessage ? 'Generating...' : '💬 Recruiter Message'}
                    </button>

                    <button
                        onClick={analyzeJob}
                        disabled={isAnalyzing}
                        className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-200 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-500/15 disabled:opacity-50"
                    >
                        {isAnalyzing ? 'Analyzing...' : '🧠 Analyze Job'}
                    </button>
                </div>
            </div>

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

            <Modal
                title="AI Job Analysis"
                content={jobAnalysis}
                isOpen={isAnalysisOpen}
                onClose={() => setIsAnalysisOpen(false)}
                maxWidth="lg"
            />
        </>
    );
}