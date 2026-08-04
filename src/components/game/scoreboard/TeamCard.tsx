import { motion } from "framer-motion";

import type { Team } from "../../../types";

type Props = {

    team: Team;

    teamCount: number;

    active: boolean;

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
    active,
}: Props) {

    const factor = Math.min(
        1,
        3 / teamCount,
    );

    const nameSize = scale(20, factor, 11);
    const scoreSize = scale(48, factor, 14);
    const labelSize = scale(16, factor, 10);
    const gap = scale(8, factor, 2);
    const px = scale(12, factor, 4);
    const py = scale(8, factor, 2);

    return (

        <motion.div
            className="flex flex-1 min-h-0 items-center rounded-lg"
            animate={
                active
                    ? {
                          boxShadow: [
                              "0 0 10px rgba(251,191,36,.3)",
                              "0 0 30px rgba(251,191,36,.8)",
                              "0 0 10px rgba(251,191,36,.3)",
                          ],
                      }
                    : {
                          boxShadow:
                              "0 0 0px rgba(251,191,36,0)",
                      }
            }
            transition={{
                duration: 1.5,
                repeat: active ? Infinity : 0,
            }}
            style={{
                padding: `${py}px ${px}px`,
                gap: `${gap}px`,
            }}
        >
            <h2
                className="
                    font-bold
                    text-amber-400
                    truncate
                "
                style={{
                    fontSize: `${nameSize}px`,
                }}
            >
                {team.name}
            </h2>

            <div
                className="
                    flex
                    items-baseline
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
            </div>
        </motion.div>

    );

}