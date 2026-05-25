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
                        className="glass-control rounded-md p-2 transition hover:text-white"
                    >
                        <FiEdit2 className="h-4 w-4" />
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="accent-control rounded-md p-2 transition"
                        >
                            <FiCheck className="h-4 w-4" />
                        </button>

                        <button
                            onClick={handleCancel}
                            className="glass-control rounded-md p-2 transition hover:text-white"
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
              glass-control
              rounded-md
              p-4
              text-sm text-white
              placeholder:text-white/35
            "
                    />
                ) : notes ? (
                    <p className="muted whitespace-pre-wrap text-sm leading-6">
                        {notes}
                    </p>
                ) : (
                    <p className="faint text-sm">
                        No notes yet.
                    </p>
                )}
            </div>
        </Panel>
    );
}
