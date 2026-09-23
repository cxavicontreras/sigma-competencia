import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { GlassCard } from "../../ui";
import { useCompetitionStore } from "../../../stores";
import { CategoryService } from "../../../services";
import { useClickCooldown } from "../../../hooks/useClickCooldown";

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

    const lockInteractions = useCompetitionStore(
        (state) => state.lockInteractions,
    );

    const cooldown = useClickCooldown();

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
        lockInteractions(400);
    }

    function handleAction() {
        cooldown(() => {
            if (isSpecialCategory || showAnswer) {
                closeQuestion();
            } else {
                setShowAnswer(true);
            }
        });
    }

    const image = showAnswer
        ? currentQuestion.answerImage
        : currentQuestion.questionImage;
    const text = showAnswer
        ? currentQuestion.answer
        : currentQuestion.question;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="question-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <GlassCard className="grid h-[90dvh] max-h-[calc(100dvh-2rem)] w-full max-w-6xl min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-3 overflow-hidden rounded-3xl p-4 sm:gap-4 sm:p-6">
                <header className="min-w-0 text-center">
                    <h2
                        id="question-modal-title"
                        className="text-[clamp(2rem,5dvh,4rem)] font-black leading-tight tracking-wide text-amber-400"
                    >
                        Punteo x{currentMultiplier}
                    </h2>
                    {currentQuestion.title && (
                        <h3 className="max-h-[12dvh] overflow-y-auto break-words text-xl font-bold leading-tight text-slate-300 sm:text-2xl lg:text-3xl">
                            {currentQuestion.title}
                        </h3>
                    )}
                </header>

                <div className="relative min-h-0 min-w-0 overflow-hidden">
                    {isSpecialCategory ? (
                        <div className="flex h-full items-center justify-center overflow-auto">
                            <h3 className="text-center text-4xl font-black text-amber-400 sm:text-6xl">
                                {questionCategory?.name}
                            </h3>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={showAnswer ? "answer" : "question"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 flex min-h-0 min-w-0 flex-col gap-3"
                            >
                                {image && (
                                    <div className="relative min-h-0 w-full flex-1">
                                        <img
                                            src={getImageUrl(image)}
                                            alt={showAnswer ? "Respuesta" : "Pregunta"}
                                            className="absolute inset-0 h-full w-full object-contain"
                                        />
                                    </div>
                                )}
                                {text && (
                                    <p
                                        className={`min-h-0 overflow-y-auto break-words text-center text-2xl font-semibold leading-snug text-slate-100 sm:text-3xl lg:text-4xl ${image ? "max-h-[35%] shrink-0" : "flex-1"}`}
                                    >
                                        {text}
                                    </p>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>

                <footer className="flex justify-center">
                    <button
                        onClick={handleAction}
                        className="shrink-0 rounded-xl bg-amber-400 px-6 py-2 text-2xl font-bold leading-tight text-slate-950 transition-colors hover:bg-amber-300 sm:px-8 sm:py-3 sm:text-3xl lg:text-4xl"
                    >
                        {isSpecialCategory || showAnswer ? "Cerrar" : "Mostrar respuesta"}
                    </button>
                </footer>
            </GlassCard>
        </div>
    );
}
