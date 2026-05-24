# Career Copilot

Career Copilot is a job-tracking web application that helps users manage job offers, track application status, analyze opportunities, and generate AI-assisted application content.

## Features

- Browse and filter job offers
- Search jobs by title, company, location, or stack
- Select a job and view detailed information
- Track job status such as interested, applied, rejected, or archived
- Save jobs locally with `localStorage`
- Import scraped job offers from the backend
- View analytics about applications and technologies
- Use AI tools to:
  - generate a motivation letter
  - create a recruiter message
  - analyze job fit

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Icons
- Vite

### Backend

- Node.js
- Express
- API routes for job scraping and AI generation

### Data Storage

The app currently stores jobs in the browser using `localStorage`.

When the app starts, it checks if jobs already exist in `localStorage`.

If saved jobs exist, they are loaded from local storage.

If no saved jobs exist, the app uses mock data from:

```ts
mockJobs