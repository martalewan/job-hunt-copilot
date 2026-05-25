import type { Job } from "../types/job";
import { EmptyState } from "./EmptyState";
import { FilterChips } from "./FilterChips";
import { JobFilters } from "./JobFilters";
import { JobList } from "./JobList";
import type { ScrapedJobsMeta } from "../services/scrapedJobs";
import { FiDownload, FiRefreshCw } from "react-icons/fi";

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
    jobsMeta,
}: JobsPanelProps) {
    return (
        <section className="glass-panel flex min-h-0 flex-1 flex-col rounded-md p-3">
            <div className="shrink-0 space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
                        {jobsMeta && (
                            <p className="faint mt-0.5 text-[0.68rem]">
                                {jobsMeta.cached ? 'Cached' : 'Fresh'}
                                {jobsMeta.cachedAt
                                    ? ` ${new Date(jobsMeta.cachedAt).toLocaleTimeString()}`
                                    : ''}
                            </p>
                        )}
                    </div>


                    <div className="flex gap-2">
                        <button
                            onClick={() => handleImportJobs()}
                            disabled={isImporting}
                            title="Import jobs"
                            aria-label="Import jobs"
                            className="glass-control inline-flex h-9 w-9 items-center justify-center rounded-md transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <FiDownload className="h-4 w-4" />
                        </button>

                        <button
                            onClick={() => handleImportJobs({ refresh: true })}
                            disabled={isImporting}
                            title="Refresh jobs"
                            aria-label="Refresh jobs"
                            className="accent-control inline-flex h-9 w-9 items-center justify-center rounded-md transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <FiRefreshCw className={`h-4 w-4 ${isImporting ? 'animate-spin' : ''}`} />
                        </button></div>

                </div>

                <div>
                    <JobFilters search={search} setSearch={setSearch} />
                </div>

                <FilterChips
                    activeView={activeView}
                    setActiveView={setActiveView}
                    jobs={jobs}
                />
            </div>

            <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-2">
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
