import {
    FiBriefcase,
    FiCalendar,
    FiMapPin,
} from 'react-icons/fi';

import { Panel } from './Panel';
import type { Job } from '../../types/job';
import { Info } from './Info';

type Props = {
    job: Job;
};

export function JobSummaryCard({ job }: Props) {
    return (
        <Panel>
            <h3 className="text-sm font-semibold">
                Job Summary
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
                {job.description || 'No description available from this source yet.'}
            </p>

            {job.descriptionType === 'preview' && (
                <p className="mt-2 text-xs text-amber-300">
                    Preview only. Open the posting for the full description.
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
