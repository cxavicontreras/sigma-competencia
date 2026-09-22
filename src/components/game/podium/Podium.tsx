import { useMemo } from "react";
import { motion } from "framer-motion";

import type { Team } from "../../../types";
import { WinnerCard } from "./WinnerCard";
import { Confetti } from "./Confetti";

type Props = {
    teams: Team[];
    onRestart: () => void;
};

export function Podium({ teams, onRestart }: Props) {
    const sorted = useMemo(
        () =>
            [...teams].sort(
                (a, b) => b.score - a.score,
            ),
        [teams],
    );

    const topFour = sorted.slice(0, 4);
    const rest = sorted.slice(4);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="
                fixed
                inset-0
                z-[100]
                flex
                flex-col
                items-center
                justify-start
                overflow-y-auto
                gap-4
                bg-[#020617]
                p-8
            "
        >
            <Confetti />

            <motion.h1
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    damping: 15,
                    stiffness: 150,
                }}
                className="
                    text-4xl sm:text-5xl
                    font-black
                    tracking-wide
                    text-amber-400
                "
            >
                Podio Final
            </motion.h1>

            <div
                className="
                    flex
                    items-end
                    w-full
                    max-w-4xl
                    shrink-0
                    border-b-2
                    border-slate-500/50
                    gap-3 sm:gap-6
                "
            >
                {topFour.map((team, index) => (
                    <WinnerCard
                        key={team.id}
                        team={team}
                        position={index}
                    />
                ))}
            </div>

            {rest.length > 0 && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 1,
                        duration: 0.4,
                    }}
                    className="
                        flex
                        flex-col
                        items-center
                        gap-4
                    "
                >
                    <h2
                        className="
                            text-3xl
                            font-bold
                            text-slate-400
                        "
                    >
                        Resto de equipos
                    </h2>

                    <div
                        className="
                            flex
                            flex-wrap
                            justify-center
                            gap-4
                        "
                    >
                        {rest.map(
                            (team, index) => (
                                <motion.div
                                    key={
                                        team.id
                                    }
                                    initial={{
                                        opacity: 0,
                                        x: -20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        delay:
                                            1.2 +
                                            index *
                                                0.1,
                                        duration: 0.3,
                                    }}
                                    className="
                                        flex
                                        min-w-32
                                        flex-col
                                        items-center
                                        gap-1
                                        rounded-xl
                                        border
                                        border-slate-600/30
                                        bg-slate-800/50
                                        px-6
                                        py-3
                                    "
                                >
                                    <span
                                        className="
                                            text-2xl
                                            font-bold
                                            text-slate-100
                                        "
                                    >
                                        {team.name}
                                    </span>

                                    <span
                                        className="
                                            text-3xl
                                            font-black
                                            text-slate-300
                                        "
                                    >
                                        {team.score}
                                    </span>

                                    <span
                                        className="
                                            text-xs
                                            text-slate-500
                                        "
                                    >
                                        puntos
                                    </span>
                                </motion.div>
                            ),
                        )}
                    </div>
                </motion.div>
            )}

            <motion.button
                initial={{
                    opacity: 0,
                    scale: 0.8,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    delay: 1.5,
                    duration: 0.4,
                }}
                onClick={onRestart}
                className="
                    rounded-xl
                    bg-amber-400
                    px-10
                    py-4
                    text-xl
                    font-bold
                    text-slate-950
                    transition-all
                    hover:scale-105
                "
            >
                Comenzar Nueva Competencia
            </motion.button>
        </motion.div>
    );
}
