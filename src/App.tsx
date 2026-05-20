import { JobCard } from './components/JobCard';
import { mockJobs } from './data/mockJobs';

function App() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">Job Hunt Copilot</h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          Track React and TypeScript frontend jobs in Paris and remote Europe.
        </p>

        <div className="mt-8 grid gap-4">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;