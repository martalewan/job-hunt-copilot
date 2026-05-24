type ModalProps = {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
    maxWidth?: 'md' | 'lg' | 'xl';
};

const maxWidthClasses = {
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
};
import { createPortal } from 'react-dom';

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

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
            <div
                className={`h-[85vh] w-[90vw] ${maxWidthClasses[maxWidth]} rounded-[32px] border border-white/10 bg-[#111]/95 p-8 backdrop-blur-2xl`}
            >
                <div className="flex items-center justify-between gap-4">
                    <h2 className="min-w-0 flex-1 text-xl font-semibold text-white">
                        {title}
                    </h2>

                    <div className="flex shrink-0 gap-2">
                        <button onClick={copyContent} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">
                            Copy
                        </button>

                        <button onClick={onClose} className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">
                            Close
                        </button>
                    </div>
                </div>

                <div className="mt-6 h-[calc(85vh-120px)] overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {content}
                </div>
            </div>
        </div>,
        document.body
    );
}