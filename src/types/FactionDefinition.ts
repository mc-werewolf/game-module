export type WinCondition = {
    expr: string;
    priority: number;
};

export type FactionDefinition = {
    id: string;
    name: string;
    color: string;
    winCondition: WinCondition;
};
