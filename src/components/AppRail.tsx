import {
    FiHome,
    FiBriefcase,
    FiBarChart2,
    FiSettings,
    FiUser,
} from 'react-icons/fi';

type AppView = 'home' | 'jobs' | 'analytics' | 'account' | 'settings';

type AppRailProps = {
    activeView: AppView;
    setActiveView: (view: AppView) => void;
};

const navTopItems: { label: string; view: AppView; icon: React.ElementType }[] = [
    { label: 'Home', view: 'home', icon: FiHome },
    { label: 'Jobs', view: 'jobs', icon: FiBriefcase },
    { label: 'Analytics', view: 'analytics', icon: FiBarChart2 },
    { label: 'Account', view: 'account', icon: FiUser },
];

const navBottomItems: { label: string; view: AppView; icon: React.ElementType }[] = [
    { label: 'Settings', view: 'settings', icon: FiSettings },
];

export function AppRail({ activeView, setActiveView }: AppRailProps) {
    return (
        <aside className="flex w-64 flex-col rounded-xs border-r border-white/10 bg-white/[0.03] p-4">
            <h1 className="mb-10 text-xl font-semibold text-white">
                Career Copilot
            </h1>

            <nav className="flex h-full flex-col justify-between">
                <div className="space-y-1">
                    {navTopItems.map(({ label, view, icon: Icon }) => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view)}
                            className={`flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm transition ${activeView === view
                                    ? 'bg-violet-500/20 text-white'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon className="mr-3 h-4 w-4" />
                            {label}
                        </button>
                    ))}
                </div>

                <div className="space-y-1">
                    {navBottomItems.map(({ label, view, icon: Icon }) => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view)}
                            className={`flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm transition ${activeView === view
                                    ? 'bg-violet-500/20 text-white'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon className="mr-3 h-4 w-4" />
                            {label}
                        </button>
                    ))}
                </div>
            </nav>
        </aside>
    );
}