export interface IUser {
    id: number,
    name: string | null,
    isArchive: boolean,
    role: string,
    phone: string,
    birthday: string | null,
}

export interface IUserTable {
    id: number,
    name: string,
    isArchive: string,
    role: string,
    phone: string,
    birthday: string,
}