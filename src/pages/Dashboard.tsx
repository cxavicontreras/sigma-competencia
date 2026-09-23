import { motion, AnimatePresence } from "framer-motion";

import { Header, Sidebar } from "../components/layout";
import { BoxGrid } from "../components/game/box";
import { Wheel } from "../components/game/wheel";
import { GlassCard } from "../components/ui";
import {
    useCompetitionStore,
    useTeamStore,
} from "../stores";
import { QuestionModal } from "../components/game/question";
import { CategoryCard } from "../components/game/reveal";
import { Podium } from "../components/game/podium";
import { ScoreAssignmentModal } from "../components/game/assignment";
import { useQuestionReveal } from "../hooks";

export function Dashboard() {

    const currenQuestion = useCompetitionStore(
        (state) => state.currentQuestion,
    );

    const finished = useCompetitionStore(
        (state) => state.finished,
    );

    const spinning = useCompetitionStore(
        (state) => state.spinning,
    );

    const revealingCategory = useCompetitionStore(
        (state) => state.revealingCategory,
    );

    const scoringActive = useCompetitionStore(
        (state) => state.scoringActive,
    );

    const setFinished = useCompetitionStore(
        (state) => state.setFinished,
    );

    const resetCompetition = useCompetitionStore(
        (state) => state.resetCompetition,
    );

    const resetScores = useTeamStore(
        (state) => state.resetScores,
    );

    const teams = useTeamStore(
        (state) => state.teams,
    );

    const { reveal, cancel: cancelReveal } =
        useQuestionReveal();

    function handleBoxSelect(box: number) {
        const state = useCompetitionStore.getState();

        if (state.usedBoxes.includes(box)) return;
        if (state.currentQuestion) return;
        if (state.spinning) return;
        if (state.revealingCategory) return;
        if (Date.now() < state.interactionLockUntil) return;

        reveal(box);
    }

    function handleFinish() {
        const state = useCompetitionStore.getState();

        if (state.spinning) return;
        if (state.currentQuestion) return;
        if (state.revealingCategory) return;
        if (state.scoringActive) return;

        cancelReveal();
        setFinished(true);
    }

    function handleRestart() {
        cancelReveal();
        resetCompetition();
        resetScores();
    }

    const finishDisabled =
        currenQuestion !== null ||
        spinning ||
        revealingCategory !== null ||
        scoringActive;

    return (

        <main className="flex h-screen flex-col bg-[#020617] p-6">

            <Header />

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: .2 }}
                className="
                    mt-6
                    grid
                    flex-1
                    grid-cols-[260px_1.6fr_280px]
                    gap-6
                "
            >

                <Sidebar />

                <GlassCard className="overflow-hidden">
                    <BoxGrid
                        onBoxSelect={handleBoxSelect}
                    />
                </GlassCard>

                <Wheel />

            </motion.section>

            <motion.footer
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: .4,
                }}
                className="mt-6"
            >

                <GlassCard
                    className="
                        flex
                        h-24
                        items-center
                        justify-center
                        px-6
                    "
                >

                    <button
                        onClick={handleFinish}
                        disabled={finishDisabled}
                        className="
                            rounded-xl
                            bg-red-500/80
                            px-6
                            py-3
                            h-10
                            w-50
                            text-sm
                            font-bold
                            transition-all
                            hover:scale-105
                            hover:bg-red-500
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Finalizar competencia
                    </button>
                </GlassCard>

            </motion.footer>

            {currenQuestion && <QuestionModal />}

            <ScoreAssignmentModal />

            <CategoryCard />

            <AnimatePresence>
                {finished && (
                    <Podium
                        teams={teams}
                        onRestart={handleRestart}
                    />
                )}
            </AnimatePresence>

        </main>

    );

}