import { chromium } from 'playwright';
import type { ScrapedJob } from './englishJobs';

export async function scrapeWelcomeToTheJungle(): Promise<ScrapedJob[]> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
        'https://www.welcometothejungle.com/en/jobs?query=react%20typescript&aroundQuery=Paris',
        { waitUntil: 'networkidle' }
    );

    const jobs = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/jobs/"]'));

        return links
            .map((link, index) => {
                const title = link.textContent?.replace(/\s+/g, ' ').trim() ?? '';
                const href = link.getAttribute('href') ?? '';

                return {
                    id: `wttj-${index}-${href}`,
                    title,
                    company: 'Welcome to the Jungle',
                    location: 'Paris',
                    remote: false,
                    tags: ['React', 'TypeScript'],
                    url: href.startsWith('http')
                        ? href
                        : `https://www.welcometothejungle.com${href}`,
                };
            })
            .filter((job) => job.title.length > 5);
    });

    await browser.close();

    console.log('WTTJ jobs:', jobs.length);

    return jobs as ScrapedJob[];
}