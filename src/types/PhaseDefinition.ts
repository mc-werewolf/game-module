export type PhaseDefinition = {
    id: string;
    name: string;
    order: number;
    durationTicks?: number;
    enterEvent?: string;
    tickEvent?: string;
    exitEvent?: string;
    tags?: string[];
};

