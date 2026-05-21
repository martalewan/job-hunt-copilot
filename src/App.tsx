import { useEffect, useMemo, useState } from 'react';
import { JobDetailsPanel } from './components/Redesign/JobDetailsPanel';
import { mockJobs } from './data/mockJobs';
import type { Job, JobStatus } from './types/job';
import { fetchScrapedJobs } from './services/scrapedJobs';
import { AppRail } from './components/Redesign/AppRail';
import { JobsPanel } from './components/Redesign/JonsPanel';

function App() {
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState<
    'all' | 'interested' | 'applied' | 'rejected' | 'archived'
  >('all');

  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? (JSON.parse(savedJobs) as Job[]) : mockJobs;
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] ?? null);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  async function handleImportJobs() {
    try {
      const importedJobs = await fetchScrapedJobs();

      localStorage.removeItem('jobs');
      setJobs(importedJobs);
      setSelectedJob(importedJobs[0] ?? null);

      localStorage.setItem('jobs', JSON.stringify(importedJobs));
    } catch (error) {
      console.error(error);
    }
  }

  function handleStatusChange(id: string, status: JobStatus) {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, status } : job
      )
    );
  }

  function handleRestore(id: string) {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, archived: false } : job
      )
    );
  }

  function handleArchive(id: string) {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, archived: true } : job
      )
    );
  }

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (activeView === 'archived') return job.archived;
        if (activeView === 'all') return !job.archived;

        return !job.archived && job.status === activeView;
      })
      .filter((job) => {
        const value =
          `${job.title} ${job.company} ${job.location} ${job.tags.join(
            ' '
          )}`.toLowerCase();

        return value.includes(search.toLowerCase());
      });
  }, [jobs, search, activeView]);

  return (
    <main className="grid h-screen grid-cols-[260px_420px_1fr] gap-4 bg-[#08090d] p-4 text-white">
      <AppRail
        activeView={activeView}
        setActiveView={(view) =>
          setActiveView(view as typeof activeView)
        }
      />

      <JobsPanel
        search={search}
        setSearch={setSearch}
        filteredJobs={filteredJobs}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        handleImportJobs={handleImportJobs}
        activeView={activeView}
        setActiveView={(view) =>
          setActiveView(view as typeof activeView)
        }
        jobs={jobs}
      />

      <section className="overflow-y-auto">
        <JobDetailsPanel job={selectedJob} />
      </section>
    </main>
  );
}

export default App;