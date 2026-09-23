import { useCallback, useEffect, useRef } from "react";

import { COMPETITION } from "../config/competition";
import {
    CategoryService,
    QuestionService,
} from "../services";
import { useCompetitionStore } from "../stores";

export function useQuestionReveal() {
    const setSelectedBox = useCompetitionStore(
        (state) => state.setSelectedBox,
    );
    const setCurrentMultiplier =
        useCompetitionStore(
            (state) => state.setCurrentMultiplier,
        );
    const setRevealingCategory =
        useCompetitionStore(
            (state) => state.setRevealingCategory,
        );
    const setCurrentQuestion =
        useCompetitionStore(
            (state) => state.setCurrentQuestion,
        );

    const timerRef = useRef<number | null>(null);

    useEffect(
        () => () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        },
        [],
    );

    const cancel = useCallback(() => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const reveal = useCallback(
        (box: number) => {
            cancel();

            const question =
                QuestionService.getQuestionForBox(
                    box,
                );

            if (!question) return;

            const { boxMultipliers } =
                useCompetitionStore.getState();

            setSelectedBox(box);
            setCurrentMultiplier(
                boxMultipliers[box] ?? 1,
            );

            const category =
                CategoryService.getById(
                    question.categoryId,
                );

            setRevealingCategory(category ?? null);

            timerRef.current = window.setTimeout(
                () => {
                    setRevealingCategory(null);
                    setCurrentQuestion(question);
                    timerRef.current = null;
                },
                COMPETITION.categoryRevealDelay,
            );
        },
        [
            cancel,
            setSelectedBox,
            setCurrentMultiplier,
            setRevealingCategory,
            setCurrentQuestion,
        ],
    );

    return { reveal, cancel };
}