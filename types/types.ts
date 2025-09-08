
export interface userState {
    accessToken: string | null;
}

export interface Story {
    id?: number;
    title: string;
    content: string;
    authorId: BigInteger;
    createdAt?: string;
    updatedAt?:string;
}