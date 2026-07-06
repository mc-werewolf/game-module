export type SkillDefinition = {
    id: string;
    name: string;
    description?: string;
    roleId?: string;
    phaseId?: string;
    timing?: string;
    target?: unknown;
    handler: SkillHandlerRef;
    cooldownTicks?: number;
    uses?: number;
    priority?: number;
    tags?: string[];
};

export type SkillHandlerRef = {
    addonId?: string;
    apiName: string;
};

