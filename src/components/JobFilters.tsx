import { FiSearch } from 'react-icons/fi';

type JobFiltersProps = {
    search: string;
    setSearch: (value: string) => void;
};

export function JobFilters({ search, setSearch }: JobFiltersProps) {
    return (
        <div className="relative w-full">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
                type="text"
                placeholder="Search React, TypeScript, Next.js..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-md border border-white/10 bg-white/[0.05] pl-9 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 hover:border-white/20 focus:border-white/20 focus:bg-white/[0.08]"
            />
        </div>
    );
}
