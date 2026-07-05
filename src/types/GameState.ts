import type { GameConfigSnapshot } from "./GameConfigSnapshot";

export type GameState = {
    readonly status: "running" | "ended";
    readonly startedAtTick: number;
    readonly endedAtTick: number | undefined;
    readonly winnerFactionIds: readonly string[];
    readonly snapshot: GameConfigSnapshot;
    readonly players: Record<string, GamePlayerState>;
};

export type GamePlayerState = {
    readonly playerId: string;
    readonly name: string;
    readonly roleId: string;
    readonly factionId: string;
    readonly isAlive: boolean;
    readonly isLeft: boolean;
    readonly statuses: Record<string, unknown>;
};
