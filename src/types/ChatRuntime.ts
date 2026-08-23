export type ChatSendEvent = {
    readonly playerId: string | undefined;
    readonly playerName: string | undefined;
    readonly message: string;
};
