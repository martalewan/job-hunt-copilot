type PanelProps = {
    children: React.ReactNode;
    className?: string;
};

export function Panel({ children, className = '' }: PanelProps) {
    return (
        <div
            className={`glass-panel rounded-md p-5 ${className}`}
        >
            {children}
        </div>
    );
}
