type JobLike = {
    id?: string;
    title?: string;
    company?: string;
    location?: string;
    url?: string;
    tags?: string[];
    remote?: boolean;
};

export function dedupeJobs<T extends JobLike>(jobs: T[]): T[] {
    const seen = new Set<string>();
    const unique: T[] = [];

    for (const job of jobs) {
        const keys = getDedupeKeys(job);

        if (keys.some((key) => seen.has(key))) continue;

        keys.forEach((key) => seen.add(key));
        unique.push(job);
    }

    return unique;
}

export function normalizeQuery(value: unknown, fallback: string): string {
    return String(value || fallback).trim().slice(0, 120);
}

function getDedupeKeys(job: JobLike): string[] {
    const keys = new Set<string>();
    const urlKey = normalizeUrl(job.url);
    const title = normalizeTitle(job.title);
    const company = normalizeCompany(job.company);
    const location = normalizeLocation(job.location);

    if (urlKey) keys.add(`url:${urlKey}`);
    if (title && company) keys.add(`role-company:${title}|${company}`);
    if (title && company && location) {
        keys.add(`role-company-location:${title}|${company}|${location}`);
    }

    return keys.size ? [...keys] : [`id:${normalizeKey(job.id)}`];
}

function normalizeTitle(value: unknown): string {
    return normalizeKey(value)
        .replace(/\b(h\/f|f\/h|m\/f|f\/m|x\/f\/m|m\/f\/x|h\/f\/x|f\/h\/x)\b/g, ' ')
        .replace(/\b(cdi|cdd|stage|alternance|freelance|remote|hybrid|nouveau)\b/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizeCompany(value: unknown): string {
    const company = normalizeKey(value);

    if (
        !company ||
        company === 'company not found' ||
        company === 'confidential' ||
        company === 'unknown'
    ) {
        return '';
    }

    return company
        .replace(/\b(sas|sasu|sa|sarl|ltd|limited|inc|gmbh|group|groupe)\b/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function normalizeLocation(value: unknown): string {
    const location = normalizeKey(value);

    if (
        location.includes('paris') ||
        location.includes('ile de france') ||
        location.includes('la defense') ||
        location.includes('hauts de seine') ||
        location.includes('val de marne') ||
        location.includes('seine saint denis')
    ) {
        return 'paris-area';
    }

    return location;
}

function normalizeUrl(value: unknown): string {
    const rawUrl = String(value || '').trim();
    if (!rawUrl) return '';

    try {
        const url = new URL(rawUrl);
        url.hash = '';

        for (const parameter of [...url.searchParams.keys()]) {
            if (
                parameter.startsWith('utm_') ||
                ['sig', 'e', 'prev', 'ql'].includes(parameter)
            ) {
                url.searchParams.delete(parameter);
            }
        }

        return `${url.hostname}${url.pathname}${url.search}`.toLowerCase();
    } catch {
        return normalizeKey(rawUrl);
    }
}

function normalizeKey(value: unknown): string {
    return String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}
