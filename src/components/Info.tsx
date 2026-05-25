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
            <span className="faint">{icon}</span>

            <div>
                <p className="faint text-[11px]">
                    {label}
                </p>

                <p className="font-medium text-white text-[11px]">
                    {value}
                </p>
            </div>
        </div>
    );
}
