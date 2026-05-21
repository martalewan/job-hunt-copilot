type PanelProps = {
    children: React.ReactNode;
    className?: string;
};

export function Panel({ children, className = '' }: PanelProps) {
    return (
        <div
            className={`rounded-md border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl ${className}`}
        >
            {children}
        </div>
    );
}