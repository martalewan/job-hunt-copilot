import { FiEdit2 } from 'react-icons/fi';
import { Panel } from './Panel';

type JobNotesCardProps = {
    notes?: string;
};

export function JobNotesCard({
    notes,
}: JobNotesCardProps) {
    return (
        <Panel>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                    Notes
                </h3>

                <button className="rounded-lg bg-white/10 p-2 text-slate-300 transition hover:bg-white/15 hover:text-white">
                    <FiEdit2 className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-4">
                {notes ? (
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                        {notes}
                    </p>
                ) : (
                    <p className="text-sm text-slate-500">
                        No notes yet.
                    </p>
                )}
            </div>
        </Panel>
    );
}