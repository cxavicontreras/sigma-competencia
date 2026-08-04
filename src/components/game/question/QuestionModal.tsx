import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GlassCard } from "../../ui";
import { useCompetitionStore } from "../../../stores";
import { CategoryService } from "../../../services";

function getImageUrl(filename: string): string {
    return new URL(
        `../../../assets/images/${filename}`,
        import.meta.url,
    ).href;
}

export function QuestionModal() {
    const [showAnswer, setShowAnswer] =
        useState(false);

    const currentQuestion = useCompetitionStore(
        (state) => state.currentQuestion,
    );

    const setCurrentQuestion = useCompetitionStore(
        (state) => state.setCurrentQuestion,
    );

    const setScoringActive = useCompetitionStore(
        (state) => state.setScoringActive,
    );

    const setPendingPoints = useCompetitionStore(
        (state) => state.setPendingPoints,
    );

    const currentMultiplier = useCompetitionStore(
        (state) => state.currentMultiplier,
    );

    useEffect(() => {
        setShowAnswer(false);
    }, [currentQuestion]);

    if (!currentQuestion) {
        return null;
    }

    const questionCategory =
        CategoryService.getById(
            currentQuestion.categoryId,
        );

    const isSpecialCategory =
        questionCategory?.name === "Sudoku" ||
        questionCategory?.name === "Crucigrama";

    const questionPoints =
        currentQuestion.points;

    function closeQuestion() {
        const points =
            questionPoints *
            currentMultiplier;
        setPendingPoints(points);
        setCurrentQuestion(null);
        setScoringActive(true);
    }

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
                p-4
            "
        >
            <GlassCard
                className="
                    flex
                    w-full
                    max-w-6xl
                    max-h-[90vh]
                    flex-col
                    items-center
                    rounded-3xl
                    p-4
                    sm:p-8
                    lg:p-12
                    gap-4
                    sm:gap-6
                "
            >
                <h2
                    className="
                        text-center
                        text-4xl
                        sm:text-6xl
                        lg:text-8xl
                        font-black
                        tracking-wide
                        text-amber-400
                    "
                >
                    Pregunta x{currentMultiplier}
                </h2>

                {currentQuestion.title && (
                    <h3
                        className="
                            text-center
                            text-2xl
                            sm:text-3xl
                            lg:text-4xl
                            font-bold
                            text-slate-300
                        "
                    >
                        {currentQuestion.title}
                    </h3>
                )}

                {isSpecialCategory ? (
                    <h3
                        className="
                            text-center
                            text-5xl
                            sm:text-6xl
                            lg:text-7xl
                            font-black
                            tracking-wide
                            text-amber-400
                        "
                    >
                        {questionCategory?.name}
                    </h3>
                ) : (
                    <>
                        {currentQuestion.questionImage &&
                            !showAnswer && (
                            <div
                                className="
                                    flex
                                    min-h-0
                                    flex-1
                                    items-center
                                    justify-center
                                    w-full
                                "
                            >
                                <img
                                    src={getImageUrl(
                                        currentQuestion.questionImage,
                                    )}
                                    alt="Pregunta"
                                    className="
                                        max-h-full
                                        max-w-full
                                        w-auto
                                        h-auto
                                        rounded-2xl
                                        object-contain
                                    "
                                />
                            </div>
                        )}

                        {currentQuestion.question && (
                            <p
                                className="
                                    text-center
                                    text-4xl
                                    sm:text-5xl
                                    lg:text-6xl
                                    font-semibold
                                    leading-relaxed
                                    text-slate-100
                                "
                            >
                                {currentQuestion.question}
                            </p>
                        )}
                    </>
                )}

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
                                min-h-0
                                flex-1
                                flex-col
                                items-center
                                gap-4
                                rounded-2xl
                                border
                                border-emerald-400/30
                                bg-emerald-500/10
                                p-4
                                sm:p-6
                                lg:p-8
                            "
                        >
                            <h3
                                className="
                                    text-4xl
                                    sm:text-5xl
                                    lg:text-6xl
                                    font-bold
                                    text-emerald-400
                                "
                            >
                                Respuesta
                            </h3>

                            {currentQuestion.answerImage && (
                                <div
                                    className="
                                        flex
                                        min-h-0
                                        flex-1
                                        items-center
                                        justify-center
                                        w-full
                                    "
                                >
                                    <img
                                        src={getImageUrl(
                                            currentQuestion.answerImage,
                                        )}
                                        alt="Respuesta"
                                        className="
                                            max-h-full
                                            max-w-full
                                            w-auto
                                            h-auto
                                            rounded-xl
                                            object-contain
                                        "
                                    />
                                </div>
                            )}

                            {currentQuestion.answer && (
                                <p
                                    className="
                                        text-center
                                        text-5xl
                                        sm:text-6xl
                                        lg:text-7xl
                                        font-semibold
                                        text-slate-100
                                    "
                                >
                                    {currentQuestion.answer}
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {isSpecialCategory ? (
                    <button
                        onClick={closeQuestion}
                        className="
                            text-3xl
                            sm:text-4xl
                            lg:text-6xl
                            rounded-xl
                            bg-amber-400
                            px-6
                            sm:px-8
                            py-2
                            sm:py-3
                            font-bold
                            text-slate-950
                            transition-all
                            hover:scale-105
                            shrink-0
                        "
                    >
                        Cerrar
                    </button>
                ) : !showAnswer ? (
                    <button
                        onClick={() =>
                            setShowAnswer(true)
                        }
                        className="
                            text-3xl
                            sm:text-4xl
                            lg:text-6xl
                            rounded-xl
                            bg-amber-400
                            px-6
                            sm:px-8
                            py-2
                            sm:py-3
                            font-bold
                            text-slate-950
                            transition-all
                            hover:scale-105
                            shrink-0
                        "
                    >
                        Mostrar respuesta
                    </button>
                ) : (
                    <button
                        onClick={closeQuestion}
                        className="
                            text-3xl
                            sm:text-4xl
                            lg:text-6xl
                            rounded-xl
                            bg-emerald-500
                            px-6
                            sm:px-8
                            py-2
                            sm:py-3
                            font-bold
                            transition-all
                            hover:scale-105
                            shrink-0
                        "
                    >
                        Cerrar
                    </button>
                )}
            </GlassCard>
        </div>
    );
}
