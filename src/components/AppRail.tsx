import {
    FiHome,
    FiBriefcase,
    FiFileText,
    FiBarChart2,
    FiSettings,
    FiUser,
} from 'react-icons/fi';

type AppRailProps = {
    activeView: string;
    setActiveView: (view: string) => void;
};

const navTopItems = [
    { label: 'Overview', icon: FiHome },
    { label: 'Jobs', icon: FiBriefcase },
    { label: 'Applications', icon: FiFileText },
    { label: 'Analytics', icon: FiBarChart2 },
];

const navBottomItems = [
    { label: 'Settings', icon: FiSettings },
    { label: 'Account', icon: FiUser },

];

export function AppRail({ activeView, setActiveView }: AppRailProps) {
    return (
        <aside className="flex flex-col rounded-xs w-64 border-r border-white/10 bg-white/[0.03] p-4">
            <h1 className="mb-10 text-xl font-semibold">Career Copilot</h1>

            <nav className="flex flex-col justify-between h-full">
                <div>
                    {navTopItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveView(item.label.toLowerCase())}
                            className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${activeView === item.label.toLowerCase()
                                ? 'bg-violet-500/20 text-white'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="mr-3 inline-block" />
                            {item.label}
                        </button>
                    ))}
                </div>
                <div>
                    {navBottomItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveView(item.label.toLowerCase())}
                            className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${activeView === item.label.toLowerCase()
                                ? 'bg-violet-500/20 text-white'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="mr-3 inline-block" />
                            {item.label}
                        </button>
                    ))}
                </div>


            </nav>
        </aside>
    );
}