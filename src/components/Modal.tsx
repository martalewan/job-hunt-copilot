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
                className={`glass-panel h-[85vh] w-[90vw] ${maxWidthClasses[maxWidth]} rounded-md p-8`}
            >
                <div className="flex items-center justify-between gap-4">
                    <h2 className="min-w-0 flex-1 text-xl font-semibold text-white">
                        {title}
                    </h2>

                    <div className="flex shrink-0 gap-2">
                        <button onClick={copyContent} className="glass-control rounded-md px-3 py-2 text-sm">
                            Copy
                        </button>

                        <button onClick={onClose} className="glass-control rounded-md px-3 py-2 text-sm">
                            Close
                        </button>
                    </div>
                </div>

                <div className="muted mt-6 h-[calc(85vh-120px)] overflow-y-auto whitespace-pre-wrap text-sm leading-7">
                    {content}
                </div>
            </div>
        </div>,
        document.body
    );
}
