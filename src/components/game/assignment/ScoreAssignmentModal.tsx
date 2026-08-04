import { motion, AnimatePresence } from "framer-motion";

import { GlassCard } from "../../ui";
import {
    useCompetitionStore,
    useTeamStore,
} from "../../../stores";

export function ScoreAssignmentModal() {

    const scoringActive = useCompetitionStore(
        (state) => state.scoringActive,
    );

    const setScoringActive = useCompetitionStore(
        (state) => state.setScoringActive,
    );

    const pendingPoints = useCompetitionStore(
        (state) => state.pendingPoints,
    );

    const selectedBox = useCompetitionStore(
        (state) => state.selectedBox,
    );

    const addUsedBox = useCompetitionStore(
        (state) => state.addUsedBox,
    );

    const teams = useTeamStore(
        (state) => state.teams,
    );

    const addPointsToTeam = useTeamStore(
        (state) => state.addPointsToTeam,
    );

    const nextTeam = useTeamStore(
        (state) => state.nextTeam,
    );

    function handleAssign(teamIndex: number) {
        addPointsToTeam(teamIndex, pendingPoints);
        if (selectedBox !== null) {
            addUsedBox(selectedBox);
        }
        nextTeam();
        setScoringActive(false);
    }

    function handleSkip() {
        if (selectedBox !== null) {
            addUsedBox(selectedBox);
        }
        nextTeam();
        setScoringActive(false);
    }

    return (
        <AnimatePresence>
            {scoringActive && (
                <motion.div
                    key="score-assignment"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/60
                        backdrop-blur-sm
                        p-4
                    "
                >
                    <GlassCard
                        className="
                            flex
                            w-full
                            max-w-3xl
                            flex-col
                            items-center
                            rounded-3xl
                            p-6
                            sm:p-10
                            gap-6
                        "
                    >
                        <h2
                            className="
                                text-4xl
                                sm:text-5xl
                                lg:text-6xl
                                font-black
                                tracking-wide
                                text-amber-400
                            "
                        >
                            Asignar Puntaje
                        </h2>

                        <p
                            className="
                                text-3xl
                                sm:text-4xl
                                lg:text-5xl
                                font-bold
                                text-emerald-400
                            "
                        >
                            +{pendingPoints} puntos
                        </p>

                        <p
                            className="
                                text-2xl
                                sm:text-3xl
                                text-slate-300
                            "
                        >
                            Seleccione el equipo que
                            recibe los puntos
                        </p>

                        <div
                            className="
                                flex
                                flex-wrap
                                justify-center
                                gap-4
                            "
                        >
                            {teams.map((team, index) => (
                                <button
                                    key={team.id}
                                    onClick={() =>
                                        handleAssign(index)
                                    }
                                    className="
                                        rounded-xl
                                        border
                                        border-amber-400/30
                                        bg-amber-400/10
                                        px-8
                                        sm:px-10
                                        py-4
                                        sm:py-5
                                        font-bold
                                        text-amber-400
                                        text-3xl
                                        sm:text-4xl
                                        transition-all
                                        hover:scale-105
                                        hover:bg-amber-400/20
                                    "
                                >
                                    {team.name}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleSkip}
                            className="
                                text-2xl
                                sm:text-3xl
                                text-slate-400
                                underline
                                transition-colors
                                hover:text-slate-200
                            "
                        >
                            Saltar
                        </button>
                    </GlassCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
