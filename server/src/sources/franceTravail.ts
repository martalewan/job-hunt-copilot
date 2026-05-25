import type { ScrapedJob } from './englishJobs';
import { cleanText } from '../utils/cleanText';

type FranceTravailJob = {
    id: string;
    intitule?: string;
    description?: string;
    typeContrat?: string;
    typeContratLibelle?: string;
    dateCreation?: string;
    entreprise?: {
        nom?: string;
    };
    lieuTravail?: {
        libelle?: string;
    };
    origineOffre?: {
        urlOrigine?: string;
    };
};

type FranceTravailResponse = {
    resultats?: FranceTravailJob[];
};

let tokenCache: {
    token: string;
    expiresAt: number;
} | null = null;

export async function scrapeFranceTravail(): Promise<ScrapedJob[]> {
    const clientId = process.env.FRANCE_TRAVAIL_CLIENT_ID;
    const clientSecret = process.env.FRANCE_TRAVAIL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.warn(
            'France Travail skipped: missing FRANCE_TRAVAIL_CLIENT_ID or FRANCE_TRAVAIL_CLIENT_SECRET'
        );
        return [];
    }

    const token = await getAccessToken(clientId, clientSecret);
    const url = new URL(
        'https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search'
    );

    url.searchParams.set('motsCles', 'frontend');
    url.searchParams.set('lieux', 'Paris');
    url.searchParams.set('range', '0-149');

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`France Travail failed with ${response.status}`);
    }

    const data = (await response.json()) as FranceTravailResponse;

    return (data.resultats ?? []).map((job) => ({
        id: `france-travail-${job.id}`,
        title: job.intitule?.trim() || 'Frontend job',
        company: job.entreprise?.nom || 'Company not found',
        location: job.lieuTravail?.libelle || 'Paris',
        remote: isRemote(job),
        tags: [
            'Frontend',
            'France Travail',
            job.typeContratLibelle || job.typeContrat || '',
        ].filter(Boolean),
        url:
            job.origineOffre?.urlOrigine ||
            `https://candidat.francetravail.fr/offres/recherche/detail/${job.id}`,
        description: cleanText(job.description ?? ''),
        descriptionType: 'full',
        postedAt: job.dateCreation,
        source: 'France Travail',
    }));
}

async function getAccessToken(
    clientId: string,
    clientSecret: string
): Promise<string> {
    if (tokenCache && tokenCache.expiresAt > Date.now() + 30_000) {
        return tokenCache.token;
    }

    const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'api_offresdemploiv2 o2dsoffre',
    });

    const response = await fetch(
        'https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            body,
        }
    );

    if (!response.ok) {
        const message = await response.text();
        throw new Error(
            `France Travail token failed with ${response.status}: ${message.slice(
                0,
                300
            )}`
        );
    }

    const data = await response.json();

    tokenCache = {
        token: data.access_token,
        expiresAt: Date.now() + Number(data.expires_in ?? 300) * 1000,
    };

    return tokenCache.token;
}

function isRemote(job: FranceTravailJob): boolean {
    const text = `${job.intitule ?? ''} ${job.description ?? ''}`.toLowerCase();
    return text.includes('remote') || text.includes('télétravail');
}
