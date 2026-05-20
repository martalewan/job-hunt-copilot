import {
    FiArchive,
    FiBriefcase,
    FiSend,
    FiStar,
    FiXCircle,
} from 'react-icons/fi';

export type ActiveView =
    | 'all'
    | 'interested'
    | 'applied'
    | 'rejected'
    | 'archived';

type SideBarProps = {
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
};

const navItems: {
    label: string;
    value: ActiveView;
    icon: React.ElementType;
}[] = [
        { label: 'All jobs', value: 'all', icon: FiBriefcase },
        { label: 'Interested', value: 'interested', icon: FiStar },
        { label: 'Applied', value: 'applied', icon: FiSend },
        { label: 'Rejected', value: 'rejected', icon: FiXCircle },
        { label: 'Archived', value: 'archived', icon: FiArchive },
    ];

export function SideBar({
    activeView,
    setActiveView,
}: SideBarProps) {
    return (
        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:block">
            <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    AI Job Assistant
                </p>

                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    Job Hunt Copilot
                </h1>
            </div>

            <nav className="mt-10 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.value;

                    return (
                        <button
                            key={item.value}
                            onClick={() => setActiveView(item.value)}
                            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${isActive
                                ? 'border border-white/10 bg-white/[0.07] text-white'
                                : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}