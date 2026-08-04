import { motion } from "framer-motion";

import type { Team } from "../../../types";

type Props = {
    team: Team;
    position: number;
    highlight?: boolean;
};

const MEDAL_COLORS = [
    "text-amber-300",
    "text-slate-300",
    "text-amber-600",
];

const MEDAL_EMOJIS = ["1️⃣", "2️⃣", "3️⃣"];

const PODIUM_HEIGHTS = [
    "h-48",
    "h-36",
    "h-28",
];

const PODIUM_ORDERS = [
    "order-2",
    "order-1",
    "order-3",
];

export function WinnerCard({
    team,
    position,
    highlight,
}: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                delay: position * 0.2 + 0.3,
                duration: 0.5,
            }}
            className={`
                flex
                flex-col
                items-center
                gap-4
                ${highlight ? "scale-110" : "scale-90"}
                ${position < 3 ? PODIUM_ORDERS[position] : ""}
            `}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    delay:
                        position * 0.2 +
                        0.5,
                    type: "spring",
                    damping: 10,
                    stiffness: 150,
                }}
                className={`
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    text-5xl
                    ${MEDAL_COLORS[position] ?? "text-slate-400"}
                `}
            >
                {MEDAL_EMOJIS[position] ??
                    "🏅"}
            </motion.div>

            <div
                className={`
                    flex
                    w-44
                    flex-col
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    px-6
                    py-4
                    ${
                        highlight
                            ? "border-amber-400/40 bg-amber-400/10"
                            : "border-slate-600/30 bg-slate-800/50"
                    }
                `}
            >
                <h3
                    className={`
                        text-center
                        text-3xl
                        font-bold
                        ${
                            highlight
                                ? "text-amber-400"
                                : "text-slate-100"
                        }
                    `}
                >
                    {team.name}
                </h3>

                <p
                    className={`
                        text-4xl
                        font-black
                        ${
                            highlight
                                ? "text-amber-300"
                                : "text-slate-300"
                        }
                    `}
                >
                    {team.score}
                </p>

                <p
                    className="
                        text-sm
                        text-slate-400
                    "
                >
                    puntos
                </p>
            </div>

            {position < 3 && (
                <div
                    className={`
                        w-32
                        rounded-t-lg
                        ${PODIUM_HEIGHTS[position]}
                        ${
                            highlight
                                ? "bg-gradient-to-t from-amber-400/30 to-amber-400/5"
                                : "bg-gradient-to-t from-slate-600/30 to-slate-600/5"
                        }
                    `}
                />
            )}
        </motion.div>
    );
}
