import teams from "../data/teams.json";

import type { Team } from "../types";

export class JsonService {

    public static getTeams(): Team[] {
        return teams;
    }

}