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
            className="w-full rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-left transition hover:bg-white/[0.08]"
        >
            <h3 className="font-medium text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">{description}</p>
        </button>
    );
}