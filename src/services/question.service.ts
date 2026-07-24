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
        if (this.questions.length < totalBoxes) {

}

        this.assignments.clear();

        const shuffled = [...this.questions]
            .sort(() => Math.random() - 0.5);

        shuffled
            .slice(0, totalBoxes)
            .forEach((question, index) => {

                this.assignments.set(
                    index + 1,
                    question,
                );

            });

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