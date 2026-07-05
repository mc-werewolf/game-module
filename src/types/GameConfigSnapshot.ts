import type { FactionDefinition } from "./FactionDefinition";
import type { PhaseDefinition } from "./PhaseDefinition";
import type { RoleDefinition } from "./RoleDefinition";
import type { SettingValue } from "./SettingDefinition";
import type { SkillDefinition } from "./SkillDefinition";

export type GameConfigSnapshot = {
    readonly settings: Record<string, SettingValue>;
    readonly roles: Record<string, RoleDefinition>;
    readonly factions: Record<string, FactionDefinition>;
    readonly skills: Record<string, SkillDefinition>;
    readonly phases: readonly PhaseDefinition[];
    readonly roleComposition: Record<string, number>;
};

