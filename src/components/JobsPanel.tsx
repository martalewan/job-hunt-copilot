import type { Job } from "../types/job";
import { EmptyState } from "./EmptyState";
import { FilterChips } from "./FilterChips";
import { JobFilters } from "./JobFilters";
import { JobList } from "./JobList";
import type { ScrapedJobsMeta } from "../services/scrapedJobs";
import { FiDownload, FiRefreshCw } from "react-icons/fi";
import type { SavedSearch, SearchRun } from "../types/search";
import { JobSearchManager } from "./JobSearchManager";

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
    savedSearches: SavedSearch[];
    activeSearchId: string;
    searchRuns: SearchRun[];
    setActiveSearchId: (id: string) => void;
    handleChangeSavedSearch: (search: SavedSearch) => void;
    handleAddSavedSearch: () => void;
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
    savedSearches,
    activeSearchId,
    searchRuns,
    setActiveSearchId,
    handleChangeSavedSearch,
    handleAddSavedSearch,
}: JobsPanelProps) {
    const activeJobsCount = jobs.filter((job) => !job.archived).length;

    return (
        <section className="glass-panel flex min-h-0 flex-1 flex-col rounded-xs p-6">
            <div className="shrink-0 space-y-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Jobs
                        </h1>

                        <p className="faint text-xs">
                            {filteredJobs.length} visible · {activeJobsCount} active
                            {jobsMeta?.cachedAt
                                ? ` · ${jobsMeta.cached ? "Cached" : "Fresh"} ${new Date(
                                    jobsMeta.cachedAt
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}`
                                : ""}
                        </p>
                    </div>

                    <div className="flex items-center gap-1.5">
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
                            <FiRefreshCw
                                className={`h-4 w-4 ${isImporting ? "animate-spin" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                <JobSearchManager
                    savedSearches={savedSearches}
                    activeSearchId={activeSearchId}
                    searchRuns={searchRuns}
                    isImporting={isImporting}
                    onSelectSearch={setActiveSearchId}
                    onChangeSearch={handleChangeSavedSearch}
                    onAddSearch={handleAddSavedSearch}
                    onRunSearch={handleImportJobs}
                />

                <div className="pt-1">
                    <JobFilters search={search} setSearch={setSearch} />
                </div>

                <div className="border-t border-white/5 pt-4">
                    <FilterChips
                        activeView={activeView}
                        setActiveView={setActiveView}
                        jobs={jobs}
                    />
                </div>
            </div>

            <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-2">
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
