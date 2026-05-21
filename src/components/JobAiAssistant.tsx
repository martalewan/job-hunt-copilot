import { Panel } from './Panel';
import { AIActionCard } from './AIActionCard';
import { Modal } from './Modal';
import { useJobAiTools } from '../hooks/useJobAiTools';
import type { Job } from '../types/job';

type JobAiAssistantProps = {
    job: Job;
};

export function JobAiAssistant({ job }: JobAiAssistantProps) {
    const ai = useJobAiTools(job);

    return (
        <Panel>
            <h3 className="text-sm font-semibold">
                AI Assistant
            </h3>

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