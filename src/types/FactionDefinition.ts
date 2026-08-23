export type WinCondition = {
    expr: string;
    priority: number;
};

export type FactionDefinition = {
    id: string;
    name: string;
    color: string;
    sortIndex?: number;
    victoryTitle?: string;
    victoryMessage?: string;
    winCondition: WinCondition;
};
