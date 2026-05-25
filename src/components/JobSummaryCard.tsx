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
    const summary = formatSummary(
        job.description,
        job.descriptionType
    );

    return (
        <Panel>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/60">
                Job Summary
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                    value={formatDate(job.postedAt)}
                />
            </div>

            {summary && (
                <p className="mt-4 text-[11px] leading-5 text-white/55">
                    {summary}
                </p>
            )}
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
            ? text.replace(
                /^[a-z][^.?!]{0,90}[.?!]\s+(?=[A-ZÀ-ÖØ-Þ])/,
                ''
            )
            : text;

    if (normalized.length <= 260) return normalized;

    return `${normalized.slice(0, 260).trim()}...`;
}


function formatDate(date?: string) {
    if (!date) return 'Recently';

    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}