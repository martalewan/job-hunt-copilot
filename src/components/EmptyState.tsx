export function EmptyState() {
    return (
        <div className="glass-panel rounded-md p-12 text-center">
            <p className="faint text-sm uppercase tracking-[0.2em]">
                No results
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                No matching jobs found
            </h2>

            <p className="muted mx-auto mt-4 max-w-md">
                Try adjusting your search or changing the current view.
            </p>
        </div>
    );
}
