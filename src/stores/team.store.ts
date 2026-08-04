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

    reloadTeams: () => void;

    createTeam: (name: string) => void;

    updateTeam: (
        id: number,
        data: Partial<Team>,
    ) => void;

    deleteTeam: (id: number) => void;

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

    reloadTeams: () =>

        set({

            teams: TeamService.getAll(),

            currentTeam: 0,

        }),

    createTeam: (name) =>

        set((state) => {

            const team = TeamService.createTeam(name);

            return {
                teams: [...state.teams, team],
            };

        }),

    updateTeam: (id, data) =>

        set((state) => {

            TeamService.updateTeam(id, data);

            return {
                teams: state.teams.map((t) =>
                    t.id === id ? { ...t, ...data } : t
                ),
            };

        }),

    deleteTeam: (id) =>

        set((state) => {

            TeamService.deleteTeam(id);

            const newTeams = state.teams.filter(
                (t) => t.id !== id,
            );

            const newIndex = Math.min(
                state.currentTeam,
                newTeams.length - 1,
            );

            return {
                teams: newTeams,
                currentTeam: newIndex >= 0 ? newIndex : 0,
            };

        }),

}));