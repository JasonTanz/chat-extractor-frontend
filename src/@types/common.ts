export type UserDetails = {
    name: string;
    wordCount: number;
};

export type ResultStructure = {
    [key: string]: UserRanking;
};

export type UserRanking = {
    [key: number]: UserDetails[];
};
