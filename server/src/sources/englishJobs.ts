import * as cheerio from 'cheerio';

export type ScrapedJob = {
    id: string;
    title: string;
    company: string;
    location: string;
    remote: boolean;
    tags: string[];
    url: string;
};

export async function scrapeEnglishJobs(): Promise<ScrapedJob[]> {
    const response = await fetch(
        'https://englishjobs.fr/in/paris/frontend_developer',
        {
            headers: {
                'User-Agent': 'Mozilla/5.0',
            },
        }
    );

    const html = await response.text();
    const $ = cheerio.load(html);

    const jobs: ScrapedJob[] = [];

    $('.job.js-job').each((index, element) => {
        const card = $(element);

        const title = card
            .find('[itemprop="title"]')
            .first()
            .text()
            .replace(/\s+/g, ' ')
            .trim();

        const href = card.find('a.js-joblink').first().attr('href');

        const company = card
            .find('ul li')
            .eq(0)
            .text()
            .replace(/\s+/g, ' ')
            .trim();

        const location = card
            .find('ul li')
            .eq(1)
            .text()
            .replace(/\s+/g, ' ')
            .trim();

        if (!title || !href) return;

        const fullUrl = href.startsWith('http')
            ? href
            : `https://englishjobs.fr${href}`;

        jobs.push({
            id: `englishjobs-${card.attr('id') || index}`,
            title,
            company: company || 'Company not found',
            location: location || 'Paris',
            remote:
                title.toLowerCase().includes('remote') ||
                location.toLowerCase().includes('remote'),
            tags: ['Frontend'],
            url: fullUrl,
        });
    });

    return jobs;
}