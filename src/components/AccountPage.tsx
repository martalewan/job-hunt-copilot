import { useEffect, useState } from 'react';

type AccountProfile = {
    name: string;
    targetRole: string;
    location: string;
    workMode: string;
    email: string;
    linkedIn: string;
    portfolio: string;
    github: string;
    cvFile?: {
        name: string;
        type: string;
        size: number;
        dataUrl: string;
        uploadedAt: string;
    };
    keywords: string;
    targetLocations: string;
    minimumMatchScore: string;
    profileSummary: string;
};

const storageKey = 'accountProfile';

const defaultProfile: AccountProfile = {
    name: '',
    targetRole: 'Frontend Developer',
    location: 'Paris',
    workMode: 'Hybrid',
    email: '',
    linkedIn: '',
    portfolio: '',
    github: '',
    keywords: 'frontend, react, typescript',
    targetLocations: 'Paris, remote',
    minimumMatchScore: '70',
    profileSummary: '',
};

export function AccountPage() {
    const [profile, setProfile] = useState<AccountProfile>(loadProfile);
    const [savedAt, setSavedAt] = useState<string | null>(null);
    const [storageError, setStorageError] = useState('');

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(profile));
            setStorageError('');
        } catch (error) {
            console.error('Account profile save error:', error);
            setStorageError('Profile saved in memory only. The CV file is probably too large for browser storage.');
        }
    }, [profile]);

    const updateProfile = (key: keyof AccountProfile, value: string) => {
        setProfile((current) => ({ ...current, [key]: value }));
    };

    const handleCvUpload = (file: File | undefined) => {
        if (!file) return;

        if (file.size > 900 * 1024) {
            window.alert('Please upload a CV smaller than 900 KB for local browser storage.');
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setProfile((current) => ({
                ...current,
                cvFile: {
                    name: file.name,
                    type: file.type || 'application/octet-stream',
                    size: file.size,
                    dataUrl: String(reader.result),
                    uploadedAt: new Date().toISOString(),
                },
            }));
        };

        reader.readAsDataURL(file);
    };

    const removeCv = () => {
        setProfile((current) => ({
            ...current,
            cvFile: undefined,
        }));
    };

    const handleSave = () => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(profile));
            setSavedAt(new Date().toLocaleTimeString());
            setStorageError('');
        } catch (error) {
            console.error('Account profile save error:', error);
            setStorageError('Could not save this profile. Try removing the CV or uploading a smaller file.');
        }
    };

    return (
        <section className="glass-panel h-full overflow-y-auto rounded-md p-6">
            <div className="flex items-start justify-between gap-6">
                <div>
                    <p className="faint text-sm uppercase tracking-[0.2em]">
                        Account
                    </p>

                    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
                        Profile & Preferences
                    </h1>

                    <p className="muted mt-3 max-w-2xl text-sm">
                        Keep your search profile in one place so applications and AI drafts can reuse it later.
                    </p>
                </div>

                <div className="text-right">
                    <button
                        onClick={handleSave}
                        className="accent-control rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Save profile
                    </button>

                    {savedAt && (
                        <p className="faint mt-2 text-xs">
                            Saved at {savedAt}
                        </p>
                    )}

                    {storageError && (
                        <p className="mt-2 max-w-xs text-xs text-[var(--status-rejected)]">
                            {storageError}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-8 grid grid-cols-[1fr_0.9fr] gap-4">
                <div className="space-y-4">
                    <AccountPanel title="Profile Basics">
                        <div className="grid grid-cols-2 gap-3">
                            <Field
                                label="Name"
                                value={profile.name}
                                onChange={(value) => updateProfile('name', value)}
                                placeholder="Your name"
                            />
                            <Field
                                label="Target role"
                                value={profile.targetRole}
                                onChange={(value) => updateProfile('targetRole', value)}
                            />
                            <Field
                                label="Location"
                                value={profile.location}
                                onChange={(value) => updateProfile('location', value)}
                            />
                            <SelectField
                                label="Work mode"
                                value={profile.workMode}
                                onChange={(value) => updateProfile('workMode', value)}
                                options={['On-site', 'Hybrid', 'Remote', 'Flexible']}
                            />
                        </div>
                    </AccountPanel>

                    <AccountPanel title="Job Search Preferences">
                        <div className="grid grid-cols-2 gap-3">
                            <Field
                                label="Keywords"
                                value={profile.keywords}
                                onChange={(value) => updateProfile('keywords', value)}
                            />
                            <Field
                                label="Target locations"
                                value={profile.targetLocations}
                                onChange={(value) => updateProfile('targetLocations', value)}
                            />
                            <Field
                                label="Minimum match score"
                                value={profile.minimumMatchScore}
                                onChange={(value) => updateProfile('minimumMatchScore', value)}
                            />
                        </div>
                    </AccountPanel>
                </div>

                <AccountPanel title="Links & CV">
                    <div className="space-y-3">
                        <Field
                            label="Email"
                            value={profile.email}
                            onChange={(value) => updateProfile('email', value)}
                            placeholder="you@example.com"
                        />
                        <Field
                            label="LinkedIn"
                            value={profile.linkedIn}
                            onChange={(value) => updateProfile('linkedIn', value)}
                            placeholder="https://linkedin.com/in/..."
                        />
                        <Field
                            label="Portfolio"
                            value={profile.portfolio}
                            onChange={(value) => updateProfile('portfolio', value)}
                        />
                        <Field
                            label="GitHub"
                            value={profile.github}
                            onChange={(value) => updateProfile('github', value)}
                        />
                        <CvUpload
                            cvFile={profile.cvFile}
                            onUpload={handleCvUpload}
                            onRemove={removeCv}
                        />
                    </div>
                </AccountPanel>
            </div>

            <AccountPanel title="Reusable Profile Summary" className="mt-4">
                <textarea
                    value={profile.profileSummary}
                    onChange={(event) => updateProfile('profileSummary', event.target.value)}
                    placeholder="Write a short paragraph about your frontend experience, strengths, and what kind of role you want."
                    className="glass-control min-h-36 w-full resize-none rounded-md p-4 text-sm text-white placeholder:text-white/35"
                />
            </AccountPanel>
        </section>
    );
}

function loadProfile(): AccountProfile {
    try {
        const saved = localStorage.getItem(storageKey);
        if (!saved) return defaultProfile;

        return { ...defaultProfile, ...JSON.parse(saved) };
    } catch (error) {
        console.error('Account profile load error:', error);
        localStorage.removeItem(storageKey);
        return defaultProfile;
    }
}

function CvUpload({
    cvFile,
    onUpload,
    onRemove,
}: {
    cvFile: AccountProfile['cvFile'];
    onUpload: (file: File | undefined) => void;
    onRemove: () => void;
}) {
    return (
        <div>
            <span className="faint text-xs">CV / Resume</span>

            <div className="glass-control mt-1 rounded-md p-3">
                {cvFile ? (
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                {cvFile.name}
                            </p>
                            <p className="faint mt-0.5 text-xs">
                                {formatFileSize(cvFile.size)} uploaded
                            </p>
                        </div>

                        <div className="flex shrink-0 gap-2">
                            <a
                                href={cvFile.dataUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="accent-control rounded-md px-3 py-2 text-xs font-medium"
                            >
                                Open
                            </a>
                            <button
                                type="button"
                                onClick={onRemove}
                                className="glass-control rounded-md px-3 py-2 text-xs font-medium"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <label className="flex cursor-pointer items-center justify-between gap-3">
                        <span className="muted text-sm">
                            Upload PDF, DOC, or DOCX
                        </span>
                        <span className="accent-control rounded-md px-3 py-2 text-xs font-medium">
                            Choose file
                        </span>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className="sr-only"
                            onChange={(event) => onUpload(event.target.files?.[0])}
                        />
                    </label>
                )}
            </div>
        </div>
    );
}

function formatFileSize(size: number) {
    if (size < 1024 * 1024) {
        return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function AccountPanel({
    title,
    children,
    className = '',
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`glass-panel rounded-md p-5 ${className}`}>
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            <div className="mt-4">{children}</div>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <label className="block">
            <span className="faint text-xs">{label}</span>
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="glass-control mt-1 h-10 w-full rounded-md px-3 text-sm placeholder:text-white/35"
            />
        </label>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
}) {
    return (
        <label className="block">
            <span className="faint text-xs">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="glass-control mt-1 h-10 w-full rounded-md px-3 text-sm"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}
