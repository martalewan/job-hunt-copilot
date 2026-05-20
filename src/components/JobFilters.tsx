import { FiSearch } from 'react-icons/fi';

type JobFiltersProps = {
    search: string;
    setSearch: (value: string) => void;
};

export function JobFilters({
    search,
    setSearch,
}: JobFiltersProps) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <FiSearch className="h-5 w-5" />
            </div>


            <input
                type="text"
                placeholder="Search React, TypeScript, Next.js..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
          w-full rounded-2xl
          border border-white/10
          bg-white/[0.03]
          px-12 py-4
          text-white
          placeholder:text-slate-500
          backdrop-blur-xl
          outline-none
          transition-all duration-300
          hover:border-white/20
          focus:border-white/20
          focus:bg-white/[0.05]
        "
            />
        </div>
    );
}