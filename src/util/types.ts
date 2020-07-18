export interface Tag {
    type: string;
    source: string;
    key: string;
    value: string;
    text: string;
    group: string;
}

export interface FilterOption {
    type?: string;
    source?: string;
    key: string;
    value: string;
    text: string;
};

export interface Problem {
    Judge: string;
    ID: string;
    Problem: string;
    Link: string;
    Level: string;
    Difficulty: string;
    Tags: string[];
    FilterOptions: FilterOption[];
}

export type SortOrder = 'default' | 'level-difficulty';