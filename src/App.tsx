import { useEffect, useMemo, useState } from 'react';
import { JobCard } from './components/JobCard';
import { JobFilters } from './components/JobFilters';
import { SideBar } from './components/SideBar';
import { mockJobs } from './data/mockJobs';
import type { Job, JobStatus } from './types/job';

function App() {
  const [search, setSearch] = useState<string>('');
  const [activeView, setActiveView] = useState<
    'all' | 'interested' | 'applied' | 'rejected' | 'archived'
  >('all');
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem('jobs');

    if (savedJobs) {
      return JSON.parse(savedJobs) as Job[];
    }

    return mockJobs;
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  function handleStatusChange(id: string, status: JobStatus) {
    setJobs((prevJobs: Job[]) =>
      prevJobs.map((job: Job) =>
        job.id === id ? { ...job, status } : job
      )
    );
  }

  function handleRestore(id: string) {
    setJobs((prevJobs: Job[]) =>
      prevJobs.map((job: Job) =>
        job.id === id ? { ...job, archived: false } : job
      )
    );
  }
  function handleArchive(id: string) {
    setJobs((prevJobs: Job[]) =>
      prevJobs.map((job: Job) =>
        job.id === id ? { ...job, archived: true } : job
      )
    );
  }

  const filteredJobs = useMemo<Job[]>(() => {
    return jobs
      .filter((job) => {
        if (activeView === 'archived') return job.archived;
        if (activeView === 'all') return !job.archived;

        return !job.archived && job.status === activeView;
      })
      .filter((job) => {
        const value =
          `${job.title} ${job.company} ${job.location} ${job.tags.join(' ')}`.toLowerCase();

        return value.includes(search.toLowerCase());
      });
  }, [jobs, search, activeView]);

  return (
    <main className="flex min-h-screen bg-[#0a0a0a] text-white">
      <SideBar activeView={activeView} setActiveView={setActiveView} />

      <section className="flex-1 p-8">
        <div className="mx-auto max-w-5xl space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Dashboard
            </p>

            <h1 className="mt-2 text-5xl font-semibold tracking-tight">
              Opportunities
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Track React and TypeScript frontend jobs in Paris and remote
              Europe.
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <JobFilters search={search} setSearch={setSearch} />
          </div>

          <div className="mb-6 mt-10 flex items-center justify-end">


            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {filteredJobs.length} jobs
            </div>
          </div>

          <div className="grid gap-4">
            {filteredJobs.map((job: Job) => (
              <JobCard
                key={job.id}
                job={job}
                onStatusChange={handleStatusChange}
                onArchive={handleArchive}
                onRestore={handleRestore}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;