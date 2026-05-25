type AppView =
    | 'home'
    | 'jobs'
    | 'analytics'
    | 'account'
    | 'settings';

type AppNavbarProps = {
    activeView: AppView;
    setActiveView: (view: AppView) => void;
};

const navTopItems: {
    label: string;
    view: AppView;
}[] = [
        { label: 'Home', view: 'home' },
        { label: 'Jobs', view: 'jobs' },
        { label: 'Analytics', view: 'analytics' },
        { label: 'Account', view: 'account' },
    ];

const navBottomItems: {
    label: string;
    view: AppView;
}[] = [
        { label: 'Settings', view: 'settings' },
    ];

export function AppNavbar({
    activeView,
    setActiveView,
}: AppNavbarProps) {
    const items = [
        ...navTopItems,
        ...navBottomItems,
    ];

    return (
        <header className="absolute top-0 left-0 right-0 z-50 border-b border-white/5 bg-(--color-dark-soft)">
            <div className="mx-auto flex h-14 items-center justify-between px-8">
                <h1 className="text-xl font-semibold tracking-tight text-white">
                    Career Copilot
                </h1>

                <nav className="flex items-center gap-8">
                    {items.map(
                        ({ label, view }) => (
                            <button
                                key={view}
                                onClick={() =>
                                    setActiveView(
                                        view
                                    )
                                }
                                className={`relative bg-transparent text-sm font-medium transition-colors cursor-pointer
                                ${activeView ===
                                        view
                                        ? 'text-white'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {label}


                            </button>
                        )
                    )}
                </nav>
            </div>
        </header>
    );
}