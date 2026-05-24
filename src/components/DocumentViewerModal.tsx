import { Modal } from './Modal';

type Props = {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
};

export function DocumentViewerModal({
    title,
    content,
    isOpen,
    onClose,
}: Props) {
    return (
        <Modal
            title={title}
            content={content}
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="lg"
        />
    );
}