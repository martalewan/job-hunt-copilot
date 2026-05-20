type JobFiltersProps = {
    search: string;
    setSearch: (value: string) => void;
};

export function JobFilters({
    search,
    setSearch,
}: JobFiltersProps) {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search React jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
        </div>
    );
}