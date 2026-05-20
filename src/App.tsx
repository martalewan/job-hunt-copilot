import { useMemo, useState } from 'react';
import { JobCard } from './components/JobCard';
import { JobFilters } from './components/JobFilters';
import { mockJobs } from './data/mockJobs';

function App() {
  const [search, setSearch] = useState('');

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const value =
        `${job.title} ${job.company} ${job.tags.join(' ')}`.toLowerCase();

      return value.includes(search.toLowerCase());
    });
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Job Hunt Copilot</h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          Track React and TypeScript frontend jobs.
        </p>

        <div className="mt-8">
          <JobFilters search={search} setSearch={setSearch} />
        </div>

        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;