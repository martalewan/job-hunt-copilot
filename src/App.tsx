import { lazy, Suspense, useMemo, useState } from 'react';
import { JobDetailsPanel } from './components/JobDetailsPanel';
import { fetchScrapedJobs, type ScrapedJobsMeta } from './services/scrapedJobs';
import { JobsPanel } from './components/JobsPanel';
import { AppNavbar } from './components/AppNavbar';
import { useJobsStore } from './hooks/useJobsStore';

const HomePage = lazy(() =>
  import('./components/HomePage').then((module) => ({ default: module.HomePage }))
);
const AnalyticsPage = lazy(() =>
  import('./components/AnalyticsPage').then((module) => ({ default: module.AnalyticsPage }))
);
const AccountPage = lazy(() =>
  import('./components/AccountPage').then((module) => ({ default: module.AccountPage }))
);

type AppView = 'home' | 'jobs' | 'analytics' | 'account';
type JobFilter = 'all' | 'interested' | 'applied' | 'rejected' | 'archived';

function App() {
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState<AppView>('jobs');
  const [activeJobFilter, setActiveJobFilter] = useState<JobFilter>('all');
  const [isImporting, setIsImporting] = useState(false);
  const [jobsMeta, setJobsMeta] = useState<ScrapedJobsMeta | null>(null);
  const jobsStore = useJobsStore();
  const {
    jobs,
    selectedJob,
    setSelectedJob,
    replaceJobs,
    updateJob,
    saveLetter,
    saveNotes,
    saveRecruiterMessage,
    saveJobAnalysis,
    saveCompanySummary,
  } = jobsStore;

  async function handleImportJobs(options: { refresh?: boolean } = {}) {
    setIsImporting(true);

    try {
      const result = await fetchScrapedJobs(options);
      const importedJobs = result.jobs;

      replaceJobs(importedJobs);
      setJobsMeta(result.meta ?? null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsImporting(false);
    }
  }

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (activeJobFilter === 'archived') return job.archived;
        if (activeJobFilter === 'all') return !job.archived;

        return !job.archived && job.status === activeJobFilter;
      })
      .filter((job) => {
        const value = `${job.title} ${job.company} ${job.location} ${job.tags.join(
          ' '
        )} ${job.source ?? ''}`.toLowerCase();

        return value.includes(search.toLowerCase());
      });
  }, [jobs, search, activeJobFilter]);

  return (
    <main className="app-shell relative flex h-screen flex-col gap-3 p-3 pt-20">
      <AppNavbar activeView={activeView} setActiveView={setActiveView} />

      <div className="min-h-0 flex-1">
        <Suspense fallback={<PageLoader />}>
          {activeView === 'home' && <HomePage jobs={jobs} />}

          {activeView === 'analytics' && (
            <AnalyticsPage jobs={jobs} />
          )}

          {activeView === 'account' && (
            <AccountPage />
          )}
        </Suspense>

        {activeView === 'jobs' && (
          <div className="grid h-full min-h-0 min-w-0 grid-cols-[420px_1fr] gap-3 overflow-hidden">
            <JobsPanel
              search={search}
              setSearch={setSearch}
              filteredJobs={filteredJobs}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
              handleImportJobs={handleImportJobs}
              isImporting={isImporting}
              activeView={activeJobFilter}
              setActiveView={(view) => setActiveJobFilter(view as JobFilter)}
              jobs={jobs}
              jobsMeta={jobsMeta}
            />

            <section className="min-h-0 overflow-y-auto">
              <JobDetailsPanel
                job={selectedJob}
                handleSaveLetter={saveLetter}
                handleSaveNotes={saveNotes}
                handleSaveRecruiterMessage={saveRecruiterMessage}
                handleSaveJobAnalysis={saveJobAnalysis}
                handleSaveCompanySummary={saveCompanySummary}
                handleUpdateJob={updateJob}
              />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function PageLoader() {
  return (
    <section className="glass-panel flex h-full items-center justify-center rounded-md p-6">
      <p className="muted text-sm">Loading...</p>
    </section>
  );
}

export default App;
