import type { Job } from "../types/job";
import { EmptyState } from "./EmptyState";
import { FilterChips } from "./FilterChips";
import { JobFilters } from "./JobFilters";
import { JobList } from "./JobList";

type JobsPanelProps = {
    search: string;
    setSearch: (value: string) => void;
    filteredJobs: Job[];
    selectedJob?: Job | null;
    setSelectedJob: (job: Job) => void;
    handleImportJobs: () => void;
    activeView: string;
    setActiveView: (view: string) => void;
    jobs: Job[];
};

export function JobsPanel({
    search,
    setSearch,
    filteredJobs,
    selectedJob,
    setSelectedJob,
    handleImportJobs,
    activeView,
    setActiveView,
    jobs
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
                </div>                <button
                    onClick={handleImportJobs}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
                >
                    Import jobs
                </button>
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