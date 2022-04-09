import { Request } from "express";

export interface Movie {
    id: number;
    title: string;
    release_date: string;
    popularity: number;
    overview: string;
    vote_average: number;
    vote_count: number;
    adult: boolean;
    genre_ids: number[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface Session<T> {
    data?: T;
    clear: () => void;
    add: (key: string, val: any) => void;
}

export interface RequestWithSession extends Request {
    session: Session<SessionData>;
}

interface SessionData {
    votedMoviesStore: any;
}
