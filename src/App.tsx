import { useEffect, useMemo, useState } from 'react';
import { JobDetailsPanel } from './components/JobDetailsPanel';
import type { Job } from './types/job';
import { fetchScrapedJobs, type ScrapedJobsMeta } from './services/scrapedJobs';
import { JobsPanel } from './components/JobsPanel';
import { HomePage } from './components/HomePage';
import { AppNavbar } from './components/AppNavbar';
import { AnalyticsPage } from './components/AnalyticsPage';
import { AccountPage } from './components/AccountPage';

type AppView = 'home' | 'jobs' | 'analytics' | 'account';
type JobFilter = 'all' | 'interested' | 'applied' | 'rejected' | 'archived';

function App() {
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState<AppView>('jobs');
  const [activeJobFilter, setActiveJobFilter] = useState<JobFilter>('all');
  const [isImporting, setIsImporting] = useState(false);
  const [jobsMeta, setJobsMeta] = useState<ScrapedJobsMeta | null>(null);

  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? (JSON.parse(savedJobs) as Job[]) : [];
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] ?? null);

  const handleSaveLetter = (id: string, generatedLetter: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, generatedLetter } : job
      )
    );

    setSelectedJob((prevJob) =>
      prevJob?.id === id ? { ...prevJob, generatedLetter } : prevJob
    );
  };

  const handleSaveRecruiterMessage = (
    id: string,
    generatedRecruiterMessage: string
  ) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, generatedRecruiterMessage } : job
      )
    );

    setSelectedJob((prevJob) =>
      prevJob?.id === id ? { ...prevJob, generatedRecruiterMessage } : prevJob
    );
  };

  const handleSaveJobAnalysis = (
    id: string,
    jobAnalysis: string
  ) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, jobAnalysis } : job
      )
    );

    setSelectedJob((prevJob) =>
      prevJob?.id === id ? { ...prevJob, jobAnalysis } : prevJob
    );
  };

  const handleSaveNotes = (id: string, notes: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, notes } : job
      )
    );

    setSelectedJob((prevJob) =>
      prevJob?.id === id ? { ...prevJob, notes } : prevJob
    );
  };

  const handleSaveCompanySummary = (id: string, companySummary: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, companySummary } : job
      )
    );

    setSelectedJob((prevJob) =>
      prevJob?.id === id ? { ...prevJob, companySummary } : prevJob
    );
  };

  const handleUpdateJob = (id: string, patch: Partial<Job>) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, ...patch } : job
      )
    );

    setSelectedJob((prevJob) =>
      prevJob?.id === id ? { ...prevJob, ...patch } : prevJob
    );
  };

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  async function handleImportJobs(options: { refresh?: boolean } = {}) {
    setIsImporting(true);

    try {
      const result = await fetchScrapedJobs(options);
      const importedJobs = result.jobs;

      setJobs(importedJobs);
      setSelectedJob(importedJobs[0] ?? null);
      setJobsMeta(result.meta ?? null);
      localStorage.setItem('jobs', JSON.stringify(importedJobs));
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
        {activeView === 'home' && <HomePage jobs={jobs} />}

        {activeView === 'analytics' && (
          <AnalyticsPage jobs={jobs} />
        )}

        {activeView === 'account' && (
          <AccountPage />
        )}

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
                handleSaveLetter={handleSaveLetter}
                handleSaveNotes={handleSaveNotes}
                handleSaveRecruiterMessage={handleSaveRecruiterMessage}
                handleSaveJobAnalysis={handleSaveJobAnalysis}
                handleSaveCompanySummary={handleSaveCompanySummary}
                handleUpdateJob={handleUpdateJob}
              />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
