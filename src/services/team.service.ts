import teams from "../data/teams.json";

import type { Team } from "../types";

export class TeamService {

    private static readonly teams =
        teams as Team[];

    public static getAll(): Team[] {

        return this.teams.map(team => ({
            ...team,
        }));

    }

    public static getById(
        id: number,
    ): Team | undefined {

        return this.teams.find(
            team => team.id === id,
        );

    }

    public static reset(): Team[] {

        return this.teams.map(team => ({

            ...team,

            score: 0,

            multiplier: 1,

        }));

    }

}