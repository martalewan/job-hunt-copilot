import { useMemo, useState } from 'react';
import { JobCard } from './components/JobCard';
import { JobFilters } from './components/JobFilters';
import { mockJobs } from './data/mockJobs';
import type { JobStatus } from './types/job';

function App() {
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState(mockJobs);

  function handleStatusChange(
    id: string,
    status: JobStatus
  ) {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id
          ? { ...job, status }
          : job
      )
    );
  }

  function handleArchive(id: string) {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id
          ? { ...job, archived: true }
          : job
      )
    );
  }

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => !job.archived)
      .filter((job) => {
        const value =
          `${job.title} ${job.company} ${job.location} ${job.tags.join(' ')}`.toLowerCase();

        return value.includes(search.toLowerCase());
      });
  }, [jobs, search]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">
          Job Hunt Copilot
        </h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          Track React and TypeScript frontend jobs.
        </p>

        <div className="mt-8">
          <JobFilters
            search={search}
            setSearch={setSearch}
          />
        </div>

        <p className="mb-4 text-sm text-slate-400">
          Showing {filteredJobs.length} job
          {filteredJobs.length === 1 ? '' : 's'}
        </p>

        <div className="grid gap-4">
          {filteredJobs.map((job) => (
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