import { create } from "zustand";

import type {
    Team,
    ScoreAdjustment,
} from "../types";

import { TeamService } from "../services";

export const MAX_SCORE_ADJUSTMENT = 1_000_000;

function clampAdjustment(amount: number): number {
    if (!Number.isFinite(amount)) {
        return 0;
    }
    return Math.min(
        Math.max(amount, -MAX_SCORE_ADJUSTMENT),
        MAX_SCORE_ADJUSTMENT,
    );
}

function safeAddScore(
    current: number,
    amount: number,
): number {
    const next = current + amount;
    if (!Number.isFinite(next)) {
        return amount < 0
            ? -Number.MAX_SAFE_INTEGER
            : Number.MAX_SAFE_INTEGER;
    }
    return next;
}

function nextDefaultName(teams: Team[]): string {
    const existing = new Set(
        teams.map((team) => team.name),
    );

    let n = 1;

    while (existing.has(`Equipo ${n}`)) {
        n++;
    }

    return `Equipo ${n}`;
}

type TeamState = {

    teams: Team[];

    currentTeam: number;

    scoreHistory: ScoreAdjustment[];

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

    adjustScore: (
        teamId: number,
        amount: number,
    ) => boolean;

    undoAdjustScore: () => boolean;

};

export const useTeamStore = create<
    TeamState & TeamActions
>((set, get) => ({

    teams: TeamService.getAll(),

    currentTeam: 0,

    scoreHistory: [],

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

        set((state) => {

            if (state.teams.length === 0) {
                return state;
            }

            return {

                currentTeam:

                     (state.currentTeam + 1) %

                    state.teams.length,

            };

        }),

    setCurrentTeam: (index) =>

        set((state) => {

            if (state.teams.length === 0) {
                return { currentTeam: 0 };
            }

            const clamped = Math.min(
                Math.max(index, 0),
                state.teams.length - 1,
            );

            return { currentTeam: clamped };

        }),

    resetScores: () =>

        set({

            teams: TeamService.reset(), 

            currentTeam: 0,

            scoreHistory: [],

        }),

    reloadTeams: () =>

        set({

            teams: TeamService.getAll(),

            currentTeam: 0,

            scoreHistory: [],

        }),

    createTeam: (name) =>

        set((state) => {

            const safeName =
                name.trim() !== ""
                    ? name.trim()
                    : nextDefaultName(state.teams);

            const team =
                TeamService.createTeam(safeName);

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

    adjustScore: (teamId, amount) => {

        const normalized = clampAdjustment(amount);

        if (normalized === 0) {
            return false;
        }

        const exists = get().teams.some(
            (team) => team.id === teamId,
        );

        if (!exists) {
            return false;
        }

        set((state) => ({
            teams: state.teams.map((team) =>
                team.id === teamId
                    ? {
                        ...team,

                        score: safeAddScore(
                            team.score,
                            normalized,
                        ),

                    }
                    : team,
            ),
            scoreHistory: [
                ...state.scoreHistory,
                { teamId, amount: normalized },
            ],
        }));

        return true;

    },

    undoAdjustScore: () => {

        const state = get();

        const last =
            state.scoreHistory[
                state.scoreHistory.length - 1
            ];

        if (!last) {
            return false;
        }

        const teamStillExists = state.teams.some(
            (team) => team.id === last.teamId,
        );

        set((current) => ({
            teams: current.teams.map((team) =>
                team.id === last.teamId
                    ? {
                        ...team,

                        score: safeAddScore(
                            team.score,
                            -last.amount,
                        ),

                    }
                    : team,
            ),
            scoreHistory:
                current.scoreHistory.slice(0, -1),
        }));

        return teamStillExists;

    },

}));