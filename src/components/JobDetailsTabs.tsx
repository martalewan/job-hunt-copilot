export type JobTab =
    | 'Overview'
    | 'Description'
    | 'Company'
    | 'Notes'
    | 'Activity';

type Props = {
    activeTab: JobTab;
    setActiveTab: (tab: JobTab) => void;
};

const tabs: JobTab[] = [
    'Overview',
    'Description',
    'Company',
    'Notes',
    'Activity',
];

export function JobDetailsTabs({
    activeTab,
    setActiveTab,
}: Props) {
    return (
        <div className="mt-5 flex gap-8 border-b border-white/10 text-xs text-slate-400">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 ${activeTab === tab
                            ? 'border-b-2 border-violet-400 text-violet-300'
                            : 'hover:text-white'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}