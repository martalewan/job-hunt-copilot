import type { Job } from "../types/job";
import { EmptyState } from "./EmptyState";
import { FilterChips } from "./FilterChips";
import { JobFilters } from "./JobFilters";
import { JobList } from "./JobList";
import type { ScrapedJobsMeta } from "../services/scrapedJobs";

type JobsPanelProps = {
    search: string;
    setSearch: (value: string) => void;
    filteredJobs: Job[];
    selectedJob?: Job | null;
    setSelectedJob: (job: Job) => void;
    handleImportJobs: (options?: { refresh?: boolean }) => void;
    isImporting: boolean;
    activeView: string;
    setActiveView: (view: string) => void;
    jobs: Job[];
    activeSource: string;
    setActiveSource: (source: string) => void;
    availableSources: string[];
    jobsMeta: ScrapedJobsMeta | null;
};

export function JobsPanel({
    search,
    setSearch,
    filteredJobs,
    selectedJob,
    setSelectedJob,
    handleImportJobs,
    isImporting,
    activeView,
    setActiveView,
    jobs,
    activeSource,
    setActiveSource,
    availableSources,
    jobsMeta,
}: JobsPanelProps) {
    return (
        <section className="flex min-h-0 flex-1 flex-col rounded-xs border border-white/10 bg-white/[0.03] p-4">
            <div className="shrink-0 space-y-4">
                <div className="flex items-end justify-between gap-4">
                    <h1 className="text-4xl font-semibold tracking-tight">Jobs</h1>

                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                        {filteredJobs.length} jobs
                    </div>
                </div>

                <JobFilters search={search} setSearch={setSearch} />
                <div className="mt-4">
                    <FilterChips
                        activeView={activeView}
                        setActiveView={setActiveView}
                        jobs={jobs}
                    />
                </div>

                <div>
                    <label className="text-xs text-slate-400">
                        Source
                        <select
                            value={activeSource}
                            onChange={(event) => setActiveSource(event.target.value)}
                            className="mt-1 w-full rounded-md border border-white/10 bg-[#101624] px-3 py-2 text-sm text-white outline-none"
                        >
                            <option value="all">All sources</option>
                            {availableSources.map((source) => (
                                <option key={source} value={source}>
                                    {source}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => handleImportJobs()}
                        disabled={isImporting}
                        className="rounded-md border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isImporting ? 'Loading...' : 'Import'}
                    </button>

                    <button
                        onClick={() => handleImportJobs({ refresh: true })}
                        disabled={isImporting}
                        className="rounded-md border border-sky-300/20 bg-sky-300/10 px-4 py-3 text-sm font-medium text-sky-100 transition hover:bg-sky-300/15 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Refresh
                    </button>
                </div>

                {jobsMeta && (
                    <p className="text-xs text-slate-500">
                        {jobsMeta.cached ? 'Cached' : 'Fresh'} results
                        {jobsMeta.cachedAt
                            ? ` from ${new Date(jobsMeta.cachedAt).toLocaleTimeString()}`
                            : ''}
                    </p>
                )}
            </div>

            <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-2">
                {filteredJobs.length === 0 ? (
                    <EmptyState />
                ) : (
                    <JobList
                        jobs={filteredJobs}
                        selectedJobId={selectedJob?.id}
                        onSelectJob={setSelectedJob}
                    />
                )}
            </div>
        </section>
    );
}
