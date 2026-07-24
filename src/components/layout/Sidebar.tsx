import { motion } from "framer-motion";

import { GlassCard } from "../ui";
import { ScoreBoard } from "../game/scoreboard";

export function Sidebar() {

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
                    gap-4
                    p-5
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

                <ScoreBoard />

            </GlassCard>

        </motion.aside>

    );

}