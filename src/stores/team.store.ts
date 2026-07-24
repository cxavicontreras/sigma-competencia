import { create } from "zustand";

import type { Team } from "../types";

import { TeamService } from "../services";

type TeamState = {

    teams: Team[];

    currentTeam: number;

};

type TeamActions = {

    nextTeam: () => void;

    setCurrentTeam: (index: number) => void;

    addPoints: (points: number) => void;

    addPointsToTeam: (
        teamIndex: number,
        points: number,
    ) => void;

    resetScores: () => void;

};

export const useTeamStore = create<TeamState & TeamActions>((set) => ({

    teams: TeamService.getAll(),

    currentTeam: 0,

    addPoints: (points) =>

        set((state) => ({

            teams: state.teams.map((team, index) =>

                index === state.currentTeam

                    ? {

                        ...team,

                        score:
                            team.score +
                            points * team.multiplier,

                    }

                    : team,

            ),

        })),

    addPointsToTeam: (teamIndex, points) =>

        set((state) => ({

            teams: state.teams.map((team, index) =>

                index === teamIndex

                    ? {

                        ...team,

                        score:
                            team.score +
                            points * team.multiplier,

                    }

                    : team,

            ),

        })),

    nextTeam: () =>

        set((state) => ({

            currentTeam:

                 (state.currentTeam + 1) %

                state.teams.length,

        })),

    setCurrentTeam: (index) =>

        set({ currentTeam: index }),

    resetScores: () =>

        set({

            teams: TeamService.reset(), 

            currentTeam: 0,

        }),

}));