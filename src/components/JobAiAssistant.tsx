import { Panel } from './Panel';
import { AIActionCard } from './AIActionCard';
import { Modal } from './Modal';
import { useJobAiTools } from '../hooks/useJobAiTools';
import type { Job } from '../types/job';

type JobAiAssistantProps = {
    job: Job;
    onSaveLetter: (id: string, generatedLetter: string) => void;
    onSaveRecruiterMessage: (
        id: string,
        generatedRecruiterMessage: string
    ) => void;
    onSaveJobAnalysis: (id: string, jobAnalysis: string) => void;
};

export function JobAiAssistant({
    job,
    onSaveLetter,
    onSaveRecruiterMessage,
    onSaveJobAnalysis,
}: JobAiAssistantProps) {
    const ai = useJobAiTools(job);

    const handleGenerateLetter = async () => {
        const letter = await ai.generateLetter();

        if (letter) {
            onSaveLetter(job.id, letter);
        }
    };

    const handleGenerateRecruiterMessage = async () => {
        const message = await ai.generateRecruiterMessage();
        if (message) onSaveRecruiterMessage(job.id, message);
    };

    const handleAnalyzeJob = async () => {
        const analysis = await ai.analyzeJob();
        if (analysis) onSaveJobAnalysis(job.id, analysis);
    };

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
                    onClick={handleGenerateLetter}
                />

                <AIActionCard
                    title={
                        ai.isGeneratingMessage
                            ? 'Generating...'
                            : 'Recruiter Message'
                    }
                    description="Write outreach message."
                    onClick={handleGenerateRecruiterMessage}
                />

                <AIActionCard
                    title={
                        ai.isAnalyzing
                            ? 'Analyzing...'
                            : 'Analyze Job Fit'
                    }
                    description="Find strengths and gaps."
                    onClick={handleAnalyzeJob}
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