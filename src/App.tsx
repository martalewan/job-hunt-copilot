import { lazy, Suspense, useMemo, useState } from 'react';
import { JobDetailsPanel } from './components/JobDetailsPanel';
import { fetchScrapedJobs, type ScrapedJobsMeta } from './services/scrapedJobs';
import { JobsPanel } from './components/JobsPanel';
import { AppNavbar } from './components/AppNavbar';
import { useJobsStore } from './hooks/useJobsStore';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { SavedSearch, SearchRun } from './types/search';

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

const defaultSavedSearches: SavedSearch[] = [
  {
    id: 'frontend-paris',
    name: 'Frontend Paris',
    keywords: 'frontend',
    location: 'Paris',
    target: 250,
  },
  {
    id: 'react-paris',
    name: 'React Paris',
    keywords: 'react frontend',
    location: 'Paris',
    target: 200,
  },
  {
    id: 'remote-europe',
    name: 'Remote Europe Frontend',
    keywords: 'frontend remote',
    location: 'Europe',
    target: 150,
  },
];

function App() {
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState<AppView>('jobs');
  const [activeJobFilter, setActiveJobFilter] = useState<JobFilter>('all');
  const [isImporting, setIsImporting] = useState(false);
  const [jobsMeta, setJobsMeta] = useState<ScrapedJobsMeta | null>(null);
  const [savedSearches, setSavedSearches] = useLocalStorage<SavedSearch[]>(
    'savedSearches',
    defaultSavedSearches
  );
  const [searchRuns, setSearchRuns] = useLocalStorage<SearchRun[]>(
    'searchRuns',
    []
  );
  const [activeSearchId, setActiveSearchId] = useState(
    savedSearches[0]?.id ?? defaultSavedSearches[0].id
  );
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

  const activeSavedSearch =
    savedSearches.find((savedSearch) => savedSearch.id === activeSearchId) ??
    savedSearches[0];

  const handleChangeSavedSearch = (updatedSearch: SavedSearch) => {
    setSavedSearches((currentSearches) =>
      currentSearches.map((search) =>
        search.id === updatedSearch.id ? updatedSearch : search
      )
    );
  };

  const handleAddSavedSearch = () => {
    const nextSearch: SavedSearch = {
      id: `search-${Date.now()}`,
      name: 'New search',
      keywords: search || 'frontend',
      location: 'Paris',
      target: 200,
    };

    setSavedSearches((currentSearches) => [nextSearch, ...currentSearches]);
    setActiveSearchId(nextSearch.id);
  };

  async function handleImportJobs(options: { refresh?: boolean } = {}) {
    setIsImporting(true);

    try {
      const previousJobIds = new Set(jobs.map((job) => job.id));
      const result = await fetchScrapedJobs({
        ...options,
        keywords: activeSavedSearch?.keywords,
        location: activeSavedSearch?.location,
        target: activeSavedSearch?.target,
      });
      const importedJobs = result.jobs;
      const runAt = new Date().toISOString();
      const newJobs = importedJobs.filter((job) => !previousJobIds.has(job.id)).length;

      replaceJobs(importedJobs);
      setJobsMeta(result.meta ?? null);
      setSearch(activeSavedSearch?.keywords ?? search);

      if (activeSavedSearch) {
        setSavedSearches((currentSearches) =>
          currentSearches.map((savedSearch) =>
            savedSearch.id === activeSavedSearch.id
              ? {
                ...savedSearch,
                lastRunAt: runAt,
                lastResultCount: importedJobs.length,
              }
              : savedSearch
          )
        );

        setSearchRuns((currentRuns) =>
          [
            {
              id: `run-${Date.now()}`,
              searchId: activeSavedSearch.id,
              searchName: activeSavedSearch.name,
              runAt,
              resultCount: importedJobs.length,
              newJobs,
              cached: Boolean(result.meta?.cached),
            },
            ...currentRuns,
          ].slice(0, 20)
        );
      }
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
              savedSearches={savedSearches}
              activeSearchId={activeSearchId}
              searchRuns={searchRuns}
              setActiveSearchId={setActiveSearchId}
              handleChangeSavedSearch={handleChangeSavedSearch}
              handleAddSavedSearch={handleAddSavedSearch}
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
