import type { ReactNode } from 'react';

type InfoProps = {
    icon: ReactNode;
    label: string;
    value: string;
};

export function Info({
    icon,
    label,
    value,
}: InfoProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-slate-500">{icon}</span>

            <div>
                <p className="text-[11px] text-slate-500">
                    {label}
                </p>

                <p className="font-medium text-white">
                    {value}
                </p>
            </div>
        </div>
    );
}