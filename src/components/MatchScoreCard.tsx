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
            <p className="text-sm text-slate-400">AI Match Score</p>

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
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="10"
                        />

                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            fill="none"
                            stroke="rgb(74 222 128)"
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

            <p className="mt-4 text-center text-sm font-medium text-emerald-300">
                Great Match
            </p>
        </Panel>
    );
}