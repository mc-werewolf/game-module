import { router } from "@kairo-js/router";
import type { FactionDefinition } from "./types/FactionDefinition";
import type { PhaseDefinition } from "./types/PhaseDefinition";
import type { RoleDefinition } from "./types/RoleDefinition";
import type { SettingDefinition } from "./types/SettingDefinition";
import type { SkillDefinition } from "./types/SkillDefinition";
import type { SkillOperation } from "./types/SkillOperation";

export class WerewolfModule {
    private readonly _factions: FactionDefinition[] = [];
    private readonly _roles: RoleDefinition[] = [];
    private readonly _skills: SkillDefinition[] = [];
    private readonly _skillOperations: SkillOperation[] = [];
    private readonly _phases: PhaseDefinition[] = [];
    private readonly _settings: SettingDefinition[] = [];

    constructor() {
        router.afterEvents.addonActivate.subscribe(() => {
            this._sendFactions();
            this._sendRoles();
            this._sendSkills();
            this._sendSkillOperations();
            this._sendPhases();
            this._sendSettings();
        });
    }

    defineFactions(factions: readonly FactionDefinition[]): void {
        this._factions.push(...factions);
    }

    defineRoles(roles: readonly RoleDefinition[]): void {
        this._roles.push(...roles);
    }

    defineSkills(skills: readonly SkillDefinition[]): void {
        this._skills.push(...skills);
    }

    defineSkillOperations(operations: readonly SkillOperation[]): void {
        this._skillOperations.push(...operations);
    }

    definePhases(phases: readonly PhaseDefinition[]): void {
        this._phases.push(...phases);
    }

    defineSettings(settings: readonly SettingDefinition[]): void {
        this._settings.push(...settings);
    }

    private _sendFactions(): void {
        for (const faction of this._factions) {
            router
                .request("werewolf-gamemanager", "werewolf:registerFaction", faction)
                .catch((err) => {
                    console.error(`[werewolf-module] Failed to register faction "${faction.id}":`, err);
                });
        }
    }

    private _sendRoles(): void {
        for (const role of this._roles) {
            router
                .request("werewolf-gamemanager", "werewolf:registerRole", {
                    roleId: role.id,
                    name: role.name,
                    description: role.description,
                    faction: role.faction,
                    divinationResult: role.divinationResult,
                    color: role.color,
                    sortIndex: role.sortIndex,
                    index: role.index,
                    max: role.max,
                    step: role.step,
                })
                .catch((err) => {
                    console.error(`[werewolf-module] Failed to register role "${role.id}":`, err);
                });
        }
    }

    private _sendSkills(): void {
        for (const skill of this._skills) {
            router
                .request("werewolf-gamemanager", "werewolf:registerSkill", skill)
                .catch((err) => {
                    console.error(`[werewolf-module] Failed to register skill "${skill.id}":`, err);
                });
        }
    }

    private _sendSkillOperations(): void {
        for (const operation of this._skillOperations) {
            router
                .request("werewolf-gamemanager", "werewolf:registerSkillOperation", operation)
                .catch((err) => {
                    console.error(`[werewolf-module] Failed to register skill operation for "${operation.targetId}":`, err);
                });
        }
    }

    private _sendPhases(): void {
        for (const phase of this._phases) {
            router
                .request("werewolf-gamemanager", "werewolf:registerPhase", phase)
                .catch((err) => {
                    console.error(`[werewolf-module] Failed to register phase "${phase.id}":`, err);
                });
        }
    }

    private _sendSettings(): void {
        for (const setting of this._settings) {
            router
                .request("werewolf-gamemanager", "werewolf:registerSetting", setting)
                .catch((err) => {
                    console.error(`[werewolf-module] Failed to register setting "${setting.id}":`, err);
                });
        }
    }
}

export const werewolf = new WerewolfModule();
