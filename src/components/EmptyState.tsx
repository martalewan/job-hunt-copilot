export function EmptyState() {
    return (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                No results
            </p>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                No matching jobs found
            </h2>

            <p className="mx-auto mt-4 max-w-md text-slate-400">
                Try adjusting your search or changing the current view.
            </p>
        </div>
    );
}