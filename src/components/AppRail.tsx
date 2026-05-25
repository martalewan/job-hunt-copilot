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
    const items = [...navTopItems, ...navBottomItems];

    return (
        <header className="glass-panel flex h-14 shrink-0 items-center justify-between rounded-md px-3">
            <h1 className="shrink-0 text-lg font-semibold text-white">
                Career Copilot
            </h1>

            <nav className="flex min-w-0 items-center gap-1 overflow-x-auto">
                {items.map(({ label, view, icon: Icon }) => (
                    <button
                        key={view}
                        onClick={() => setActiveView(view)}
                        className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-sm transition ${activeView === view
                            ? 'accent-control'
                            : 'muted hover:text-white'
                            }`}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </button>
                ))}
            </nav>
        </header>
    );
}
