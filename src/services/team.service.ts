import teams from "../data/teams.json";

import type { Team } from "../types";

export class TeamService {

    private static teams: Team[] = (
        teams as Team[]
    ).map((team) => ({ ...team }));

    private static nextId =
        TeamService.teams.length + 1;

    public static getAll(): Team[] {

        return this.teams.map((team) => ({
            ...team,
        }));

    }

    public static getById(
        id: number,
    ): Team | undefined {

        return this.teams.find(
            (team) => team.id === id,
        );

    }

    public static createTeam(
        name: string,
    ): Team {

        const team: Team = {
            id: this.nextId++,
            name,
            score: 0,
            multiplier: 1,
        };

        this.teams.push(team);

        return { ...team };

    }

    public static updateTeam(
        id: number,
        data: Partial<Team>,
    ): Team | undefined {

        const index = this.teams.findIndex(
            (t) => t.id === id,
        );

        if (index === -1) return undefined;

        this.teams[index] = {
            ...this.teams[index],
            ...data,
            id,
        };

        return { ...this.teams[index] };

    }

    public static deleteTeam(
        id: number,
    ): boolean {

        const index = this.teams.findIndex(
            (t) => t.id === id,
        );

        if (index === -1) return false;

        this.teams.splice(index, 1);

        return true;

    }

    public static reset(): Team[] {

        return this.teams.map((team) => ({

            ...team,

            score: 0,

            multiplier: 1,

        }));

    }

}