import { FiSearch } from 'react-icons/fi';

type JobFiltersProps = {
    search: string;
    setSearch: (value: string) => void;
};

export function JobFilters({ search, setSearch }: JobFiltersProps) {
    return (
        <div className="relative w-full">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
                type="text"
                placeholder="Search React, TypeScript, Next.js..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 hover:border-white/20 focus:border-white/20 focus:bg-white/[0.08]"
            />
        </div>
    );
}