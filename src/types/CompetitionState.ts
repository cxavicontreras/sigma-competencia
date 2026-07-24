import type { Question } from "./Question";
import type { Category } from "./Category";

export interface CompetitionState {

    selectedBox: number | null;

    currentQuestion: Question | null;

    currentMultiplier: number;

    boxMultipliers: Record<number, number>;

    usedBoxes: number[];

    spinning: boolean;

    finished: boolean;

    revealingCategory: Category | null;

}