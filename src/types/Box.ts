export type BoxState =
    | "closed"
    | "opening"
    | "opened";

export interface BoxData {
    id: number;
    state: BoxState;
    selected: boolean;
}