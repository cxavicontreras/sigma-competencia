import { activeVersion } from "./versions";

export const COMPETITION = {
    splashDuration: 3500,
    totalBoxes: activeVersion?.questions.length ?? 0,
    maxWheelSpins: 6,
    puzzleDuration: 600,
    categoryRevealDelay: 2200,
};
