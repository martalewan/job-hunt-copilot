import type { SavedSearch, SearchRun } from '../types/search';

type JobSearchManagerProps = {
    savedSearches: SavedSearch[];
    activeSearchId: string;
    searchRuns: SearchRun[];
    isImporting: boolean;
    onSelectSearch: (id: string) => void;
    onChangeSearch: (search: SavedSearch) => void;
    onAddSearch: () => void;
    onRunSearch: (options?: { refresh?: boolean }) => void;
};

export function JobSearchManager({
    savedSearches,
    activeSearchId,
    searchRuns,
    isImporting,
    onSelectSearch,
    onChangeSearch,
    onAddSearch,
    onRunSearch,
}: JobSearchManagerProps) {
    const activeSearch =
        savedSearches.find((search) => search.id === activeSearchId) ??
        savedSearches[0];
    const recentRuns = searchRuns.slice(0, 3);

    if (!activeSearch) return null;

    return (
        <div className="glass-panel rounded-md p-3">
            <div className="flex items-center justify-between gap-2">
                <select
                    value={activeSearch.id}
                    onChange={(event) => onSelectSearch(event.target.value)}
                    className="glass-control h-9 min-w-0 flex-1 rounded-md px-2 text-xs"
                >
                    {savedSearches.map((search) => (
                        <option key={search.id} value={search.id}>
                            {search.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={onAddSearch}
                    className="glass-control h-9 rounded-md px-3 text-xs font-medium"
                >
                    New
                </button>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_1fr_70px] gap-2">
                <Field
                    label="Keywords"
                    value={activeSearch.keywords}
                    onChange={(value) =>
                        onChangeSearch({ ...activeSearch, keywords: value })
                    }
                />
                <Field
                    label="Location"
                    value={activeSearch.location}
                    onChange={(value) =>
                        onChangeSearch({ ...activeSearch, location: value })
                    }
                />
                <Field
                    label="Target"
                    value={String(activeSearch.target)}
                    onChange={(value) =>
                        onChangeSearch({
                            ...activeSearch,
                            target: Number(value) || activeSearch.target,
                        })
                    }
                />
            </div>

            <div className="mt-3 flex gap-2">
                <button
                    onClick={() => onRunSearch()}
                    disabled={isImporting}
                    className="accent-control h-9 flex-1 rounded-md px-3 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isImporting ? 'Running...' : 'Run search'}
                </button>
                <button
                    onClick={() => onRunSearch({ refresh: true })}
                    disabled={isImporting}
                    className="glass-control h-9 rounded-md px-3 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Refresh
                </button>
            </div>

            {activeSearch.lastRunAt && (
                <p className="faint mt-2 text-[0.68rem]">
                    Last run {formatTime(activeSearch.lastRunAt)} ·{' '}
                    {activeSearch.lastResultCount ?? 0} jobs
                </p>
            )}

            {recentRuns.length > 0 && (
                <div className="mt-3 border-t border-white/5 pt-3">
                    <p className="faint text-[0.68rem] uppercase tracking-[0.16em]">
                        Refresh history
                    </p>
                    <div className="mt-2 space-y-1.5">
                        {recentRuns.map((run) => (
                            <div
                                key={run.id}
                                className="flex items-center justify-between gap-2 text-xs"
                            >
                                <span className="muted truncate">
                                    {run.searchName}
                                </span>
                                <span className="faint shrink-0">
                                    {run.resultCount} jobs · +{run.newJobs} ·{' '}
                                    {formatTime(run.runAt)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <label>
            <span className="faint text-[0.65rem]">{label}</span>
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="glass-control mt-1 h-8 w-full rounded-md px-2 text-xs"
            />
        </label>
    );
}

function formatTime(value: string) {
    return new Date(value).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
}
