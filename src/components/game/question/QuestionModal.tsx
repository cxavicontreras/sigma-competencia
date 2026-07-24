import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GlassCard } from "../../ui";
import { useCompetitionStore } from "../../../stores";
import { useTeamStore } from "../../../stores";

type StealPhase =
    | "none"
    | "decide"
    | "select";

export function QuestionModal() {
    const [showAnswer, setShowAnswer] =
        useState(false);

    const [stealPhase, setStealPhase] =
        useState<StealPhase>("none");

    const currentQuestion = useCompetitionStore(
        state => state.currentQuestion
    );

    const setCurrentQuestion = useCompetitionStore(
        state => state.setCurrentQuestion
    );

    const addPoints = useTeamStore(
        state => state.addPoints
    );

    const addPointsToTeam = useTeamStore(
        state => state.addPointsToTeam
    );

    const nextTeam = useTeamStore(
        state => state.nextTeam
    );

    const teams = useTeamStore(
        state => state.teams
    );

    const currentTeam = useTeamStore(
        state => state.currentTeam
    );

    const addUsedBox = useCompetitionStore(
        state => state.addUsedBox
    );

    const selectedBox = useCompetitionStore(
        state => state.selectedBox
    );

    const currentMultiplier = useCompetitionStore(
        state => state.currentMultiplier
    );

    useEffect(() => {
        setShowAnswer(false);
        setStealPhase("none");
    }, [currentQuestion]);

    if (!currentQuestion) {
        return null;
    }

    function closeQuestion() {
        if (selectedBox !== null) {
            addUsedBox(selectedBox);
        }
        nextTeam();
        setShowAnswer(false);
        setStealPhase("none");
        setCurrentQuestion(null);
    }

    function handleCorrect() {
        if (!currentQuestion) return;
        addPoints(
            currentQuestion.points *
                currentMultiplier
        );
        closeQuestion();
    }

    function handleIncorrect() {
        setStealPhase("decide");
    }

    function handleSteal(teamIndex: number) {
        if (!currentQuestion) return;
        addPointsToTeam(
            teamIndex,
            currentQuestion.points *
                currentMultiplier
        );
        closeQuestion();
    }

    const stealableTeams = teams.filter(
        (_, index) => index !== currentTeam
    );

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/60
                backdrop-blur-sm
            "
        >
            <GlassCard
                className="
                    flex
                    w-full
                    flex-col
                    rounded-3xl
                    p-12
                    gap-8
                "
            >
                <h2
                    className="
                        text-center
                        text-8xl
                        font-black
                        tracking-wide
                        text-amber-400
                    "
                >
                    Pregunta x{currentMultiplier}
                </h2>

                <p
                    className="
                        text-center
                        text-6xl
                        font-semibold
                        leading-relaxed
                        text-slate-100
                    "
                >
                    {currentQuestion.question}
                </p>

                <div
                    className="
                        h-px
                        w-full
                        bg-white/10
                    "
                />

                <AnimatePresence mode="wait">
                    {showAnswer && (
                        <motion.div
                            key="answer"
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -10,
                            }}
                            transition={{
                                duration: 0.35,
                            }}
                            className="
                                flex
                                w-full
                                flex-col
                                items-center
                                gap-4
                                rounded-2xl
                                border
                                border-emerald-400/30
                                bg-emerald-500/10
                                p-8
                            "
                        >
                            <h3
                                className="
                                    text-6xl
                                    font-bold
                                    text-emerald-400
                                "
                            >
                                Respuesta
                            </h3>

                            <p
                                className="
                                    text-center
                                    text-7xl
                                    font-semibold
                                    text-slate-100
                                "
                            >
                                {currentQuestion.answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!showAnswer ? (
                    <button
                        onClick={() =>
                            setShowAnswer(true)
                        }
                        className="
                            text-6xl
                            gap-10
                            rounded-xl
                            bg-amber-400
                            px-8
                            py-3
                            font-bold
                            text-slate-950
                            transition-all
                            hover:scale-105
                        "
                    >
                        Mostrar respuesta
                    </button>
                ) : stealPhase === "none" ? (
                    <div
                        className="
                            flex
                            gap-4
                        "
                    >
                        <button
                            onClick={handleIncorrect}
                            className="
                                text-6xl
                                rounded-xl
                                bg-red-500
                                px-8
                                py-3
                                font-bold
                                transition-all
                                hover:scale-105
                            "
                        >
                            Incorrecta
                        </button>

                        <button
                            onClick={handleCorrect}
                            className="
                                text-6xl
                                rounded-xl
                                bg-emerald-500
                                px-8
                                py-3
                                font-bold
                                transition-all
                                hover:scale-105
                            "
                        >
                            Correcta
                        </button>
                    </div>
                ) : stealPhase === "decide" ? (
                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            gap-4
                        "
                    >
                        <p
                            className="
                                text-6xl
                                font-semibold
                                text-slate-300
                            "
                        >
                            Desea robar la pregunta?
                        </p>

                        <div
                            className="
                                flex
                                gap-4
                            "
                        >
                            <button
                                onClick={closeQuestion}
                                className="
                                    text-6xl
                                    rounded-xl
                                    bg-slate-600
                                    px-8
                                    py-3
                                    font-bold
                                    transition-all
                                    hover:scale-105
                                "
                            >
                                Sin robo
                            </button>

                            <button
                                onClick={() =>
                                    setStealPhase("select")
                                }
                                className="
                                    text-6xl
                                    rounded-xl
                                    bg-amber-500
                                    px-8
                                    py-3
                                    font-bold
                                    transition-all
                                    hover:scale-105
                                "
                            >
                                Robar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            gap-4
                        "
                    >
                        <p
                            className="
                                text-5xl
                                font-semibold
                                text-slate-300
                            "
                        >
                            Seleccione el equipo que
                            recibe los puntos
                        </p>

                        <div
                            className="
                                flex
                                gap-4
                            "
                        >
                            {stealableTeams.map(
                                (team) => {
                                    const teamIndex =
                                        teams.indexOf(team);
                                    return (
                                        <button
                                            key={team.id}
                                            onClick={() =>
                                                handleSteal(
                                                    teamIndex
                                                )
                                            }
                                            className="
                                                text-5xl  
                                                rounded-xl
                                                border
                                                border-amber-400/30
                                                bg-amber-400/10
                                                px-8
                                                py-3
                                                font-bold
                                                text-amber-400
                                                transition-all
                                                hover:scale-105
                                                hover:bg-amber-400/20
                                            "
                                        >
                                            {team.name}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <button
                            onClick={() =>
                                setStealPhase("decide")
                            }
                            className="
                                text-4xl
                                mt-2
                                text-slate-400
                                underline
                                transition-colors
                                hover:text-slate-200
                            "
                        >
                            Volver
                        </button>
                    </div>
                )}
            </GlassCard>
        </div>
    );
}
