import { create } from "zustand";

import type {
    CompetitionState,
    Question,
    Category,
} from "../types";

import { generateBoxMultipliers } from "../config/boxMultipliers";
import { COMPETITION } from "../config/competition";

type CompetitionActions = {

    setSelectedBox: (
        box: number | null
    ) => void;

    setSpinning: (
        value: boolean
    ) => void;

    addUsedBox: (
        box: number
    ) => void;

    setCurrentQuestion: (
        question: Question | null
    ) => void;

    setCurrentMultiplier: (
        multiplier: number
    ) => void;

    setFinished: (
        value: boolean
    ) => void;

    setRevealingCategory: (
        category: Category | null
    ) => void;

    initBoxMultipliers: () => void;

    resetCompetition: () => void;

    setScoringActive: (
        active: boolean
    ) => void;

    setPendingPoints: (
        points: number
    ) => void;

};

export const useCompetitionStore = create<
    CompetitionState & CompetitionActions
>((set) => ({

    selectedBox: null,

    currentQuestion: null,

    currentMultiplier: 1,

    boxMultipliers: {},

    usedBoxes: [],

    spinning: false,

    finished: false,

    revealingCategory: null,

    scoringActive: false,

    pendingPoints: 0,

    setSelectedBox: (box) =>
        set({
            selectedBox: box,
        }),

    setCurrentQuestion: (question) =>
        set({
            currentQuestion: question,
        }),

    setCurrentMultiplier: (multiplier) =>
        set({
            currentMultiplier: multiplier,
        }),

    setRevealingCategory: (category) =>
        set({
            revealingCategory: category,
        }),

    initBoxMultipliers: () =>
        set({
            boxMultipliers: generateBoxMultipliers(
                COMPETITION.totalBoxes,
            ),
        }),

    setFinished: (value) =>
        set({
            finished: value,
        }),

    resetCompetition: () =>
        set({
            selectedBox: null,
            currentQuestion: null,
            currentMultiplier: 1,
            boxMultipliers: generateBoxMultipliers(
                COMPETITION.totalBoxes,
            ),
            usedBoxes: [],
            spinning: false,
            finished: false,
            revealingCategory: null,
            scoringActive: false,
            pendingPoints: 0,
        }),

    setScoringActive: (active) =>
        set({
            scoringActive: active,
        }),

    setPendingPoints: (points) =>
        set({
            pendingPoints: points,
        }),

    setSpinning: (value) =>
        set({
            spinning: value,
        }),

    addUsedBox: (box) =>
        set((state) => ({
            usedBoxes: [
                ...state.usedBoxes,
                box,
            ],
        })),

}));