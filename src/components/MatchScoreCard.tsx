import { Panel } from './Panel';

type MatchScoreCardProps = {
    score: number;
};

export function MatchScoreCard({ score }: MatchScoreCardProps) {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const progress = circumference - (score / 100) * circumference;

    return (
        <Panel>
            <p className="text-sm">AI Match Score</p>

            <div className="mt-3 flex justify-center">
                <div className="relative h-32 w-32">
                    <svg
                        className="-rotate-90"
                        width="128"
                        height="128"
                        viewBox="0 0 128 128"
                    >
                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            fill="none"
                            stroke="var(--glass-line)"
                            strokeWidth="10"
                        />

                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            fill="none"
                            stroke="var(--color-aster-blue)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={progress}
                            className="transition-all duration-700"
                        />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-semibold text-white">
                            {score}%
                        </span>
                    </div>
                </div>
            </div>

            <p className="accent-text mt-4 text-center text-sm font-medium">
                Great Match
            </p>
        </Panel>
    );
}
