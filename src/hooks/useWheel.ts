import { useRef, useState } from "react";

import {
    WheelService,
    QuestionService,
    CategoryService,
} from "../services";

import { useCompetitionStore } from "../stores";

const REVEAL_DELAY = 2200;

export function useWheel() {

    const [rotation, setRotation] = useState(0);

    const [displayNumber, setDisplayNumber] =
        useState<number | null>(null);

    const [isSpinning, setIsSpinning] =
        useState(false);

    const intervalRef =
        useRef<number | null>(null);

    const finalNumberRef =
        useRef<number | null>(null);

    const spinningRef =
        useRef(false);

    const revealTimerRef =
        useRef<number | null>(null);

    const setSelectedBox = useCompetitionStore(
        state => state.setSelectedBox
    );

    const setCurrentQuestion = useCompetitionStore(
        state => state.setCurrentQuestion
    );

    const setCurrentMultiplier = useCompetitionStore(
        state => state.setCurrentMultiplier
    );

    const setRevealingCategory = useCompetitionStore(
        state => state.setRevealingCategory
    );

    const setSpinning = useCompetitionStore(
        state => state.setSpinning
    );
    const usedBoxes = useCompetitionStore(
        state => state.usedBoxes
    );

    const boxMultipliers = useCompetitionStore(
        state => state.boxMultipliers
    );

    function spinWheel() {

        if (isSpinning) return;

        spinningRef.current = true;

        setIsSpinning(true);
        setSpinning(true);

        const finalNumber = WheelService.spin(30, usedBoxes);

        finalNumberRef.current = finalNumber;

        setRotation(previous =>
            previous +
            360 * 8 +
            Math.random() * 360
        );

        intervalRef.current = window.setInterval(() => {

            if (!spinningRef.current) return;

            setDisplayNumber(
                WheelService.spin(30)
            );

        }, 70);

    }

    function handleAnimationComplete() {

        spinningRef.current = false;

        if (intervalRef.current !== null) {

            clearInterval(intervalRef.current);
            intervalRef.current = null;

        }

        if (finalNumberRef.current === null) {
            return;
        }

        setDisplayNumber(finalNumberRef.current);

        setSelectedBox(finalNumberRef.current);

        setCurrentMultiplier(
            boxMultipliers[finalNumberRef.current] ?? 1
        );

        const question =
            QuestionService.getQuestionForBox(
                finalNumberRef.current
            );

        if (question) {

            const category = CategoryService.getById(
                question.categoryId,
            );

            if (category) {
                setRevealingCategory(category);
            }

            revealTimerRef.current = window.setTimeout(() => {

                setRevealingCategory(null);
                setCurrentQuestion(question);

                revealTimerRef.current = null;

            }, REVEAL_DELAY);

        } else {

            setCurrentQuestion(null);

        }

        setSpinning(false);

        setIsSpinning(false);

    }

    return {

        rotation,
        displayNumber,
        isSpinning,

        spinWheel,
        handleAnimationComplete,

    };

}
