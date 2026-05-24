import { useEffect } from 'react';

import { Panel } from './Panel';
import { AIActionCard } from './AIActionCard';
import { Modal } from './Modal';
import { useJobAiTools } from '../hooks/useJobAiTools';
import type { Job } from '../types/job';

type JobAiAssistantProps = {
    job: Job;
    onSaveLetter: (id: string, generatedLetter: string) => void;
};

export function JobAiAssistant({
    job,
    onSaveLetter,
}: JobAiAssistantProps) {
    const ai = useJobAiTools(job);

    useEffect(() => {
        if (ai.letter) {
            onSaveLetter(job.id, ai.letter);
        }
    }, [ai.letter, job.id, onSaveLetter]);

    return (
        <Panel>
            <h3 className="text-sm font-semibold">
                AI Assistant
            </h3>

            {job.generatedLetter && (
                <p className="mt-2 text-xs text-emerald-300">
                    Letter saved for this job
                </p>
            )}

            <div className="mt-4 space-y-3">
                <AIActionCard
                    title={
                        ai.isGeneratingLetter
                            ? 'Generating...'
                            : 'Generate Motivation Letter'
                    }
                    description="Create a personalized letter."
                    onClick={ai.generateLetter}
                />

                <AIActionCard
                    title={
                        ai.isGeneratingMessage
                            ? 'Generating...'
                            : 'Recruiter Message'
                    }
                    description="Write outreach message."
                    onClick={ai.generateRecruiterMessage}
                />

                <AIActionCard
                    title={
                        ai.isAnalyzing
                            ? 'Analyzing...'
                            : 'Analyze Job Fit'
                    }
                    description="Find strengths and gaps."
                    onClick={ai.analyzeJob}
                />
            </div>

            <Modal
                title="Recruiter Message"
                content={ai.recruiterMessage}
                isOpen={ai.isRecruiterMessageOpen}
                onClose={() => ai.setIsRecruiterMessageOpen(false)}
                maxWidth="md"
            />

            <Modal
                title="AI Motivation Letter"
                content={ai.letter}
                isOpen={ai.isLetterOpen}
                onClose={() => ai.setIsLetterOpen(false)}
                maxWidth="lg"
            />

            <Modal
                title="AI Job Analysis"
                content={ai.jobAnalysis}
                isOpen={ai.isAnalysisOpen}
                onClose={() => ai.setIsAnalysisOpen(false)}
                maxWidth="lg"
            />
        </Panel>
    );
}