import { useEffect, useRef, useState } from "react";

import {
    WheelService,
} from "../services";

import { COMPETITION } from "../config/competition";
import { useCompetitionStore } from "../stores";
import { useQuestionReveal } from "./useQuestionReveal";

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

    const setSpinning = useCompetitionStore(
        state => state.setSpinning
    );

    const usedBoxes = useCompetitionStore(
        state => state.usedBoxes
    );

    const finished = useCompetitionStore(
        state => state.finished
    );

    const totalBoxes = COMPETITION.totalBoxes;

    const canSpin = usedBoxes.length < totalBoxes;

    const { reveal: revealBox, cancel: cancelReveal } =
        useQuestionReveal();

    useEffect(
        () => () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
            cancelReveal();
        },
        [cancelReveal],
    );

    useEffect(() => {
        if (!finished) {
            setDisplayNumber(null);
            finalNumberRef.current = null;
        }
    }, [finished]);

    function spinWheel() {

        const state = useCompetitionStore.getState();

        if (isSpinning || spinningRef.current) return;
        if (state.currentQuestion) return;
        if (state.revealingCategory) return;
        if (state.scoringActive) return;
        if (Date.now() < state.interactionLockUntil) return;
        if (state.usedBoxes.length >= totalBoxes) return;

        let finalNumber: number;

        try {
            finalNumber = WheelService.spin(
                totalBoxes,
                state.usedBoxes,
            );
        } catch {
            return;
        }

        spinningRef.current = true;

        finalNumberRef.current = finalNumber;

        setIsSpinning(true);
        setSpinning(true);

        setRotation(previous =>
            previous +
            360 * 8 +
            Math.random() * 360
        );

        intervalRef.current = window.setInterval(() => {

            if (!spinningRef.current) return;

            const { usedBoxes: currentUsed } =
                useCompetitionStore.getState();

            setDisplayNumber(
                WheelService.spin(
                    totalBoxes,
                    currentUsed,
                ),
            );

        }, 70);

    }

    function handleAnimationComplete() {

        if (finalNumberRef.current === null) {
            return;
        }

        spinningRef.current = false;

        if (intervalRef.current !== null) {

            clearInterval(intervalRef.current);
            intervalRef.current = null;

        }

        const number = finalNumberRef.current;
        finalNumberRef.current = null;

        setDisplayNumber(number);

        revealBox(number);

        setSpinning(false);
        setIsSpinning(false);

    }

    return {

        rotation,
        displayNumber,
        isSpinning,
        canSpin,

        spinWheel,
        handleAnimationComplete,

    };

}