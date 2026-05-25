import type { ScrapedJob } from './englishJobs';

export async function scrapeWelcomeToTheJungle(): Promise<ScrapedJob[]> {
    console.warn(
        'WelcomeToTheJungle skipped: the public /jobs page no longer exposes job cards to scrape reliably.'
    );

    return [];
}
