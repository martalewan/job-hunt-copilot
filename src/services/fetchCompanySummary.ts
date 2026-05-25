import { API_BASE_URL } from '../config/api';

export async function fetchCompanySummary({
    company,
    jobTitle,
    description,
}: {
    company: string;
    jobTitle?: string;
    description?: string;
}) {
    const response = await fetch(`${API_BASE_URL}/api/companies/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, jobTitle, description }),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(
            `Failed to generate company summary (${response.status}): ${message}`
        );
    }

    const data = await response.json();

    return data.summary as string;
}
