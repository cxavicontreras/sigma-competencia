import { activeVersion } from "../config/versions";

import type { Question } from "../types";

export class QuestionService {

    private static readonly questions =
        activeVersion?.questions ?? [];

    private static readonly assignments =
        new Map<number, Question>();

    public static getAll(): Question[] {

        return this.questions;

    }

    public static getById(id: number): Question | undefined {

        return this.questions.find(
            question => question.id === id
        );

    }

    public static initialize(totalBoxes: number): void {
        this.assignments.clear();

        if (!Number.isInteger(totalBoxes) || totalBoxes < 0 || totalBoxes > this.questions.length) {
            throw new Error("No hay suficientes preguntas únicas para las casillas solicitadas.");
        }

        const shuffled = [...this.questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        for (let i = 0; i < totalBoxes; i++) {
            this.assignments.set(
                i + 1,
                shuffled[i],
            );
        }
    }

    public static getQuestionForBox(
        box: number,
    ): Question | undefined {

        return this.assignments.get(box);

    }

    public static reset(): void {

        this.assignments.clear();

    }

}
