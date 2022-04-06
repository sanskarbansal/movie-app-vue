// import { Genre, Movie } from "./types";
interface Id {
    id: number;
}

export function filterById<T extends Id>(data: T[], id: number) {
    for (let object of data) {
        if (object.id && object.id === id) {
            return object;
        }
    }
    return null;
}
