import type { SkillDefinition, SkillHandlerRef } from "./SkillDefinition";
import type { SkillContext, SkillResult } from "./SkillRuntime";

export type SkillOperation =
    | PatchSkillOperation
    | DisableSkillOperation
    | ReplaceSkillOperation
    | WrapSkillOperation;

export type SkillOperationBase = {
    readonly targetId: string;
    readonly priority?: number;
};

export type PatchSkillOperation = SkillOperationBase & {
    readonly op: "patch";
    readonly patch: SkillPatch;
};

export type DisableSkillOperation = SkillOperationBase & {
    readonly op: "disable";
};

export type ReplaceSkillOperation = SkillOperationBase & {
    readonly op: "replace";
    readonly entry: SkillDefinition;
};

export type WrapSkillOperation = SkillOperationBase & {
    readonly op: "wrap";
    readonly wrapper: SkillWrapperDefinition;
};

export type SkillPatch = Partial<Omit<SkillDefinition, "id">>;

export type SkillWrapperDefinition = {
    readonly id: string;
    readonly handler: SkillHandlerRef;
};

export type SkillWrapperContext = SkillContext & {
    readonly wrapperId: string;
    readonly targetSkillId: string;
    readonly originalResult: SkillResult;
};
