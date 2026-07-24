import categories from "../data/categories.json";

import type { Category } from "../types";

export class CategoryService {

    private static readonly categories =
        categories as Category[];

    public static getAll(): Category[] {

        return this.categories;

    }

    public static getById(
        id: number,
    ): Category | undefined {

        return this.categories.find(
            category => category.id === id,
        );

    }

}
