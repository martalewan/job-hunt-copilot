type AIActionCardProps = {
    title: string;
    description: string;
    onClick: () => void;
};

export function AIActionCard({
    title,
    description,
    onClick,
}: AIActionCardProps) {
    return (
        <button
            onClick={onClick}
            className="glass-control w-full rounded-md p-4 text-left transition"
        >
            <h3 className="font-medium text-white">{title}</h3>
            <p className="muted mt-1 text-sm">{description}</p>
        </button>
    );
}
