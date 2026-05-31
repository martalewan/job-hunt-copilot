import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

import { scrapeEnglishJobs } from './sources/englishJobs';
import { scrapeRemotive } from './sources/remotiveJobs';
import { scrapeRemoteOk } from './sources/remoteOk';
import { scrapeWeAreDevelopers } from './sources/weAreDevelopers';
import { scrapeWelcomeToTheJungle } from './sources/welcomeToTheJungle';
import { scrapeJooble } from './sources/jooble';
import { scrapeFranceTravail } from './sources/franceTravail';

import { dedupeJobs } from './utils/dedupeJobs';
import { rankJobs } from './utils/rankJobs';
import letterRoutes from './routes/letterRoutes';
import companyRoutes from './routes/companyRoutes';

const app = express();
const CACHE_DURATION_MS = 30 * 60 * 1000;

let jobsCache:
    | {
          createdAt: number;
          key: string;
          jobs: any[];
          sourceCounts: Record<string, number>;
      }
    | null = null;

app.use(cors());
app.use(express.json());

app.use('/api/letters', letterRoutes);
app.use('/api/companies', companyRoutes);
app.get('/api/jobs', async (req, res) => {
    try {
        const refresh = req.query.refresh === 'true';
        const searchOptions = {
            keywords: String(req.query.query || 'frontend'),
            location: String(req.query.location || 'Paris'),
            target: Number(req.query.target || 350),
        };
        const cacheKey = JSON.stringify(searchOptions);

        if (
            !refresh &&
            jobsCache &&
            jobsCache.key === cacheKey &&
            Date.now() - jobsCache.createdAt < CACHE_DURATION_MS
        ) {
            res.json({
                jobs: jobsCache.jobs,
                meta: {
                    cached: true,
                    cachedAt: new Date(jobsCache.createdAt).toISOString(),
                    sourceCounts: jobsCache.sourceCounts,
                    total: jobsCache.jobs.length,
                },
            });
            return;
        }

        const results = await Promise.allSettled([
            scrapeEnglishJobs(),
            scrapeRemotive(),
            scrapeRemoteOk(),
            scrapeWeAreDevelopers(),
            scrapeWelcomeToTheJungle(),
            scrapeJooble(searchOptions),
            scrapeFranceTravail(searchOptions),
        ]);

        const sourceNames = [
            'EnglishJobs',
            'Remotive',
            'RemoteOK',
            'WeAreDevelopers',
            'WelcomeToTheJungle',
            'Jooble',
            'France Travail',
        ];

        const sourceCounts: Record<string, number> = {};

        results.forEach((result, index) => {
            const source = sourceNames[index];

            if (result.status === 'fulfilled') {
                sourceCounts[source] = result.value.length;

                if (result.value.length === 0) {
                    console.warn(
                        `${source}: 0 relevant frontend jobs found in the current source response`
                    );
                } else {
                    console.log(`${source}: ${result.value.length} jobs`);
                }
            } else {
                sourceCounts[source] = 0;
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
        const rankedJobs = rankJobs(dedupedJobs);

        console.log('Total before dedupe:', jobs.length);
        console.log('Total after dedupe:', rankedJobs.length);

        jobsCache = {
            createdAt: Date.now(),
            key: cacheKey,
            jobs: rankedJobs,
            sourceCounts,
        };

        res.json({
            jobs: rankedJobs,
            meta: {
                cached: false,
                cachedAt: new Date(jobsCache.createdAt).toISOString(),
                sourceCounts,
                total: rankedJobs.length,
            },
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
