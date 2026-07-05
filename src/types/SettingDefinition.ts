export type SettingDefinition =
    | ToggleSettingDefinition
    | SliderSettingDefinition
    | DropdownSettingDefinition;

export type SettingValue = boolean | number | string;

type SettingBase = {
    id: string;
    name: string;
    description?: string;
    category?: string;
    order?: number;
};

export type ToggleSettingDefinition = SettingBase & {
    type: "toggle";
    defaultValue: boolean;
};

export type SliderSettingDefinition = SettingBase & {
    type: "slider";
    min: number;
    max: number;
    step: number;
    defaultValue: number;
};

export type DropdownSettingDefinition = SettingBase & {
    type: "dropdown";
    options: {
        value: string;
        label: string;
    }[];
    defaultValue: string;
};
