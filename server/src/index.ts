import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

import { scrapeEnglishJobs } from './sources/englishJobs';
import { scrapeRemotive } from './sources/remotiveJobs';
import { scrapeRemoteOk } from './sources/remoteOk';
import { scrapeWeAreDevelopers } from './sources/weAreDevelopers';
import { scrapeWelcomeToTheJungle } from './sources/welcomeToTheJungle';

import { dedupeJobs } from './utils/dedupeJobs';
import letterRoutes from './routes/letterRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/letters', letterRoutes);

app.get('/api/jobs', async (_req, res) => {
    try {
        const results = await Promise.allSettled([
            scrapeEnglishJobs(),
            scrapeRemotive(),
            scrapeRemoteOk(),
            scrapeWeAreDevelopers(),
            scrapeWelcomeToTheJungle(),
        ]);

        const sourceNames = [
            'EnglishJobs',
            'Remotive',
            'RemoteOK',
            'WeAreDevelopers',
            'WelcomeToTheJungle',
        ];

        results.forEach((result, index) => {
            const source = sourceNames[index];

            if (result.status === 'fulfilled') {
                console.log(`${source}: ${result.value.length} jobs`);
            } else {
                console.error(`${source} failed:`, result.reason);
            }
        });

        const jobs = results
            .filter(
                (
                    result
                ): result is PromiseFulfilledResult<any> =>
                    result.status === 'fulfilled'
            )
            .flatMap((result) => result.value);

        const dedupedJobs = dedupeJobs(jobs);

        console.log('Total before dedupe:', jobs.length);
        console.log('Total after dedupe:', dedupedJobs.length);

        res.json({
            jobs: dedupedJobs,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Failed to scrape jobs',
        });
    }
});

app.listen(4000, () => {
    console.log(
        'Server running on http://localhost:4000'
    );
});