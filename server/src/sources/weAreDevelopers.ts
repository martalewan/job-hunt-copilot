import * as cheerio from 'cheerio';
import type { ScrapedJob } from './englishJobs';

export async function scrapeWeAreDevelopers(): Promise<ScrapedJob[]> {
    const response = await fetch(
        'https://www.wearedevelopers.com/jobs',
        {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        }
    );

    const html = await response.text();

    const $ = cheerio.load(html);

    const jobs: ScrapedJob[] = [];

    $('a').each((index, element) => {
        const link = $(element);

        const title = link
            .text()
            .replace(/\s+/g, ' ')
            .trim();

        const href = link.attr('href');

        if (!title || !href) return;

        const text = title.toLowerCase();

        const isRelevant =
            text.includes('frontend') ||
            text.includes('front-end') ||
            text.includes('react') ||
            text.includes('typescript') ||
            text.includes('javascript');

        if (!isRelevant) return;

        const fullUrl = href.startsWith('http')
            ? href
            : `https://www.wearedevelopers.com${href}`;

        jobs.push({
            id: `wad-${index}-${title}`,
            title,
            company: 'WeAreDevelopers',
            location: 'Europe',
            remote: true,
            tags: ['Frontend'],
            url: fullUrl,
        });
    });

    return jobs;
}