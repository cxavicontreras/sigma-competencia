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

export function Dashboard() {

    const currenQuestion = useCompetitionStore(
        state => state.currentQuestion
    );

    const finished = useCompetitionStore(
        state => state.finished
    );

    const setFinished = useCompetitionStore(
        state => state.setFinished
    );

    const resetCompetition = useCompetitionStore(
        state => state.resetCompetition
    );

    const resetScores = useTeamStore(
        state => state.resetScores
    );

    function handleFinish() {
        setFinished(true);
    }

    function handleRestart() {
        resetCompetition();
        resetScores();
    }

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
                    <BoxGrid />
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
                        justify-between
                        px-6
                    "
                >

                    <button
                        onClick={handleFinish}
                        className="
                            rounded-xl
                            bg-red-500/80
                            px-6
                            py-3
                            text-sm
                            font-bold
                            transition-all
                            hover:scale-105
                            hover:bg-red-500
                        "
                    >
                        Finalizar competencia
                    </button>

                    <p className="text-slate-400">
                        Controles de la competencia
                    </p>

                </GlassCard>

            </motion.footer>
            {
                currenQuestion && (
                    <QuestionModal />
                )
            }

            <CategoryCard />

            <AnimatePresence>
                {finished && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="
                            fixed
                            inset-0
                            z-[100]
                            flex
                            items-center
                            justify-center
                            bg-[#020617]
                        "
                    >
                        <motion.div
                            initial={{
                                scale: 0.8,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.15,
                                duration: 0.4,
                            }}
                            className="
                                flex
                                flex-col
                                items-center
                                gap-10
                            "
                        >
                            <h1
                                className="
                                    text-6xl
                                    font-black
                                    tracking-wide
                                    text-amber-400
                                "
                            >
                                Competencia Finalizada
                            </h1>

                            <button
                                onClick={handleRestart}
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
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>

    );

}
