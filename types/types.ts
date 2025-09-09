
export interface userState {
    accessToken: string | null;
    authored: number[];
    contributed: number[]
}

export interface Story {
    id: number;
    title: string;
    content: string;
    author_id: BigInteger;
    created_at?: string;
    updated_at?:string;
}