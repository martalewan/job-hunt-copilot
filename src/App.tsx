import { useEffect, useMemo, useState } from 'react';
import { JobCard } from './components/JobCard';
import { JobFilters } from './components/JobFilters';
import { mockJobs } from './data/mockJobs';
import type { Job, JobStatus } from './types/job';

function App() {
  const [search, setSearch] = useState<string>('');

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

  function handleArchive(id: string) {
    setJobs((prevJobs: Job[]) =>
      prevJobs.map((job: Job) =>
        job.id === id ? { ...job, archived: true } : job
      )
    );
  }

  const filteredJobs = useMemo<Job[]>(() => {
    return jobs
      .filter((job: Job) => !job.archived)
      .filter((job: Job) => {
        const value =
          `${job.title} ${job.company} ${job.location} ${job.tags.join(' ')}`.toLowerCase();

        return value.includes(search.toLowerCase());
      });
  }, [jobs, search]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <section className="mx-auto max-w-5xl space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            AI Job Assistant
          </p>

          <h1 className="mt-2 text-5xl font-semibold tracking-tight">
            Job Hunt Copilot
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Track React and TypeScript frontend jobs in Paris and remote Europe.
          </p>
        </div>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <JobFilters search={search} setSearch={setSearch} />
        </div>

        <div className="mb-6 mt-10 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Opportunities
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Frontend Positions
            </h2>
          </div>

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
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;