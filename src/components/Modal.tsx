type ModalProps = {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
    maxWidth?: 'md' | 'lg' | 'xl';
};

const maxWidthClasses = {
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-4xl',
};

export function Modal({
    title,
    content,
    isOpen,
    onClose,
    maxWidth = 'lg',
}: ModalProps) {
    if (!isOpen) return null;

    async function copyContent() {
        await navigator.clipboard.writeText(content);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
            <div
                className={`w-full ${maxWidthClasses[maxWidth]} rounded-[32px] border border-white/10 bg-[#111]/95 p-8 backdrop-blur-2xl`}
            >
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-white">
                        {title}
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={copyContent}
                            className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                        >
                            Copy
                        </button>

                        <button
                            onClick={onClose}
                            className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="mt-6 max-h-[65vh] overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {content}
                </div>
            </div>
        </div>
    );
}