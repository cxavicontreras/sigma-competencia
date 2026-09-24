import type { Team } from "../../../types";

type Props = {

    team: Team;

    teamCount: number;

};

function scale(
    base: number,
    factor: number,
    min: number,
): number {
    return Math.max(
        min,
        Math.round(base * factor),
    );
}

export function TeamCard({
    team,
    teamCount,
}: Props) {

    const factor = Math.min(
        1,
        6 / Math.max(teamCount, 1),
    );

    const nameSize = scale(24, factor, 20);
    const scoreSize = scale(36, factor, 24);
    const labelSize = scale(14, factor, 12);
    const gap = scale(8, factor, 2);
    const px = scale(10, factor, 8);
    const py = scale(8, factor, 6);

    return (

        <div
            className="flex w-full min-w-0 min-h-0 items-center justify-between rounded-xl border border-white/10 bg-slate-800/60"
            style={{
                padding: `${py}px ${px}px`,
                gap: `${gap}px`,
            }}
        >
            <span
                className="
                    font-bold
                    text-amber-400
                    min-w-0
                    flex-1
                    break-words
                    leading-tight
                "
                style={{
                    fontSize: `${nameSize}px`,
                }}
            >
                {team.name}
            </span>

            <span
                className="
                    flex
                    items-baseline
                    shrink-0
                    gap-1
                "
                style={{
                    gap: `${Math.round(gap / 2)}px`,
                }}
            >
                <span
                    className="font-black text-white"
                    style={{
                        fontSize: `${scoreSize}px`,
                    }}
                >
                    {team.score}
                </span>

                <span
                    className="text-slate-400"
                    style={{
                        fontSize: `${labelSize}px`,
                    }}
                >
                    pts
                </span>
            </span>
        </div>

    );

}
