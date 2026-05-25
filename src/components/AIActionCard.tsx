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
            className="
                glass-control
                w-full
                rounded-md
                px-3
                py-2.5
                text-left
                transition-all
                hover:border-[var(--color-aster-blue-line)]
                hover:bg-white/[0.08]
            "
        >
            <h3 className="text-xs font-semibold tracking-tight text-white">
                {title}
            </h3>

            <p className="mt-0.5 text-[11px] leading-relaxed text-white/45">
                {description}
            </p>
        </button>
    );
}