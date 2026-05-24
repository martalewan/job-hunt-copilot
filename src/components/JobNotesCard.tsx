import { useEffect, useState } from 'react';
import { FiCheck, FiEdit2, FiX } from 'react-icons/fi';

import { Panel } from './Panel';

type JobNotesCardProps = {
    notes?: string;
    onSaveNotes?: (notes: string) => void;
};

export function JobNotesCard({
    notes,
    onSaveNotes,
}: JobNotesCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(notes ?? '');

    useEffect(() => {
        setDraft(notes ?? '');
    }, [notes]);

    const handleSave = () => {
        onSaveNotes?.(draft);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDraft(notes ?? '');
        setIsEditing(false);
    };

    return (
        <Panel>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                    Notes
                </h3>

                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="rounded-lg bg-white/10 p-2 text-slate-300 transition hover:bg-white/15 hover:text-white"
                    >
                        <FiEdit2 className="h-4 w-4" />
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300 transition hover:bg-emerald-500/30"
                        >
                            <FiCheck className="h-4 w-4" />
                        </button>

                        <button
                            onClick={handleCancel}
                            className="rounded-lg bg-red-500/20 p-2 text-red-300 transition hover:bg-red-500/30"
                        >
                            <FiX className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-4">
                {isEditing ? (
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Add notes about this opportunity..."
                        className="
              min-h-40 w-full resize-none
              rounded-2xl
              border border-white/10
              bg-white/5
              p-4
              text-sm text-white
              outline-none
              placeholder:text-slate-500
            "
                    />
                ) : notes ? (
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