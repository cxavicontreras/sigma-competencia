import questions from "../data/questions.json";

import type { Question } from "../types";

export class QuestionService {

    private static readonly questions =
        questions as Question[];

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

        if (totalBoxes <= 0 || this.questions.length === 0) {
            return;
        }

        const shuffled = [...this.questions]
            .sort(() => Math.random() - 0.5);

        for (let i = 0; i < totalBoxes; i++) {
            this.assignments.set(
                i + 1,
                shuffled[i % shuffled.length],
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