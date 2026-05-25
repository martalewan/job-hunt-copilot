import { Panel } from './Panel';

type Props = {
    skills: string[];
};

export function MissingSkillsCard({
    skills,
}: Props) {
    return (
        <Panel>
            <h3 className="text-sm font-semibold">
                Missing Skills
            </h3>

            <ul className="mt-4 space-y-3">
                {skills.map((item) => (
                    <li
                        key={item}
                        className="flex items-center gap-2 text-xs"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-aster-blue)]" />
                        {item}
                    </li>
                ))}
            </ul>
        </Panel>
    );
}
