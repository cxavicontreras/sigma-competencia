export interface Team {

    id: number;

    name: string;

    score: number;

    multiplier: number;

}

export interface ScoreAdjustment {

    teamId: number;

    amount: number;

}