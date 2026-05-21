import { FiCheck } from 'react-icons/fi';
import { Panel } from './Panel';

type Props = {
    strengths: string[];
};

export function StrengthsCard({
    strengths,
}: Props) {
    return (
        <Panel>
            <h3 className="text-sm font-semibold">
                Top Strengths
            </h3>

            <ul className="mt-4 space-y-3">
                {strengths.map((item) => (
                    <li
                        key={item}
                        className="flex items-center gap-2"
                    >
                        <FiCheck className="text-emerald-400" />
                        {item}
                    </li>
                ))}
            </ul>
        </Panel>
    );
}