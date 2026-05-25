import {
    FiBriefcase,
    FiCalendar,
    FiMapPin,
} from 'react-icons/fi';

import { Panel } from './Panel';
import { Info } from './Info';
import type { Job } from '../types/job';

type Props = {
    job: Job;
};

export function JobSummaryCard({ job }: Props) {
    const summary = formatSummary(job.description, job.descriptionType);

    return (
        <Panel>
            <h3 className="text-sm font-semibold">
                Job Summary
            </h3>

            <p className="muted mt-3 text-sm leading-6">
                {summary || 'No description available from this source yet.'}
            </p>

            {job.descriptionType === 'preview' && (
                <p className="accent-text mt-2 text-xs">
                    Preview excerpt. Open the posting for the full description.
                </p>
            )}

            <div className="mt-5 grid grid-cols-4 gap-4">
                <Info
                    icon={<FiBriefcase />}
                    label="Experience"
                    value={job.experience ?? 'Not specified'}
                />

                <Info
                    icon={<FiBriefcase />}
                    label="Employment"
                    value={job.employmentType ?? 'Full-time'}
                />

                <Info
                    icon={<FiMapPin />}
                    label="Location"
                    value={job.location}
                />

                <Info
                    icon={<FiCalendar />}
                    label="Posted"
                    value={job.postedAt ?? 'Recently'}
                />
            </div>
        </Panel>
    );
}

function formatSummary(
    description: string | undefined,
    type: Job['descriptionType']
) {
    const text = (description ?? '').trim();
    const normalized =
        type === 'preview'
            ? text.replace(/^[a-z][^.?!]{0,90}[.?!]\s+(?=[A-ZÀ-ÖØ-Þ])/, '')
            : text;

    if (normalized.length <= 260) return normalized;

    return `${normalized.slice(0, 260).trim()}...`;
}
