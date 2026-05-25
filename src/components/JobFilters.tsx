import { FiSearch } from 'react-icons/fi';

type JobFiltersProps = {
    search: string;
    setSearch: (value: string) => void;
};

export function JobFilters({ search, setSearch }: JobFiltersProps) {
    return (
        <div className="relative w-full">
            <FiSearch className="muted pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2" />

            <input
                type="text"
                placeholder="Search React, TypeScript, Next.js..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="glass-control h-9 w-full rounded-md pl-9 pr-3 text-sm placeholder:text-white/35 transition-all duration-300"
            />
        </div>
    );
}
