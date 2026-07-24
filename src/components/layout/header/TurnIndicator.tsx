import { AnimatePresence, motion } from "framer-motion";

import { useTeamStore } from "../../../stores";

export function TurnIndicator() {

    const teams = useTeamStore(
        state => state.teams
    );

    const currentTeam = useTeamStore(
        state => state.currentTeam
    );

    const team = teams[currentTeam];

    if (!team) {
        return null;
    }

    return (

        <div
            className="
                flex
                flex-col
                items-center
                justify-center
            "
        >

            <span
                className="
                    text-xs
                    font-bold
                    tracking-[.35em]
                    text-slate-400
                "
            >
                TURNO DE
            </span>

            <AnimatePresence mode="wait">

                <motion.h2

                    key={team.id}

                    initial={{
                        opacity: 0,
                        y: -20,
                        scale: .9,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}

                    exit={{
                        opacity: 0,
                        y: 20,
                        scale: .9,
                    }}

                    transition={{
                        duration: .35,
                    }}

                    className="
                        text-3xl
                        font-black
                        text-amber-400
                    "

                >

                    {team.name}

                </motion.h2>

            </AnimatePresence>

        </div>

    );

}