export type JobStatus = 'new' | 'interested' | 'applied' | 'rejected';

export type Job = {
    id: string;

    // Basic info
    title: string;
    company: string;
    location: string;
    remote: boolean;
    url: string;

    // Technologies
    tags: string[];

    // Tracking
    status: JobStatus;
    archived: boolean;
    bookmarked?: boolean;
    priority?: 'Low' | 'Medium' | 'High';

    // Details
    description?: string;
    descriptionType?: 'full' | 'preview';
    requirements?: string[];
    benefits?: string[];

    // Company
    companyLogo?: string;
    companyWebsite?: string;
    companySize?: string;
    industry?: string;

    // Job info
    employmentType?: string; // Full-time, Contract...
    seniority?: string;      // Junior, Mid, Senior...
    department?: string;
    experience?: string;

    // Compensation
    salaryMin?: number;
    salaryMax?: number;
    currency?: string;

    // Dates
    postedAt?: string;
    appliedAt?: string;
    updatedAt?: string;
    followUpAt?: string;

    // AI analysis
    matchScore?: number;
    strengths?: string[];
    missingSkills?: string[];

    // AI
    generatedLetter?: string;
    generatedRecruiterMessage?: string;
    jobAnalysis?: string;

    // Personal notes
    notes?: string;

    // Recruiter
    recruiterName?: string;
    recruiterEmail?: string;
    recruiterLinkedIn?: string;
};
