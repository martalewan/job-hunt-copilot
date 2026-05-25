import type { Job } from '../types/job';
import { JobSummaryCard } from './JobSummaryCard';

import { MatchScoreCard } from './MatchScoreCard';
import { MissingSkillsCard } from './MissingSkillsCard';
import { StrengthsCard } from './StrengthsCard';

type Props = {
    job: Job;
};

export function JobOverview({ job }: Props) {
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <MatchScoreCard score={job.matchScore ?? 84} />

                <StrengthsCard
                    strengths={
                        job.strengths ?? [
                            'React',
                            'TypeScript',
                            'Frontend Architecture',
                        ]
                    }
                />

                <MissingSkillsCard
                    skills={
                        job.missingSkills ?? [
                            'GraphQL',
                            'AWS',
                        ]
                    }
                />
            </div>

            <JobSummaryCard job={job} />
        </>
    );
}
