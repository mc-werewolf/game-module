export type RoleDefinition = {
    id: string;
    name: string;
    description?: string;
    faction: string;
    divinationResult?: string;
    color?: string;
    sortIndex?: number;
    index?: number;
    max?: number;  // 省略時: 4
    step?: number; // 省略時: 1
};
