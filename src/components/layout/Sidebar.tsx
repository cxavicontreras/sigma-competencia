import { useState } from "react";
import { motion } from "framer-motion";

import { GlassCard } from "../ui";
import { ScoreBoard } from "../game/scoreboard";
import { TeamManagementModal } from "../game/team";

export function Sidebar() {

    const [showManagement, setShowManagement] =
        useState(false);

    return (

        <motion.aside

            initial={{
                opacity: 0,
                x: -40,
            }}

            animate={{
                opacity: 1,
                x: 0,
            }}

            transition={{
                delay: .2,
            }}

        >

            <GlassCard

                className="
                    flex
                    h-full
                    flex-col
                    gap-3
                    p-4
                    overflow-hidden
                "

            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                    "
                >
                    <h2
                        className="
                            text-xl
                            font-bold
                            text-amber-400
                        "
                    >
                        Equipos
                    </h2>

                    <button
                        onClick={() =>
                            setShowManagement(true)
                        }
                        className="
                            rounded-lg
                            bg-slate-700
                            px-3
                            py-1
                            text-xs
                            font-bold
                            transition-all
                            hover:scale-105
                            hover:bg-slate-600
                        "
                    >
                        Gestionar
                    </button>
                </div>

                <ScoreBoard />

            </GlassCard>

            <TeamManagementModal
                open={showManagement}
                onClose={() =>
                    setShowManagement(false)
                }
            />

        </motion.aside>

    );

}