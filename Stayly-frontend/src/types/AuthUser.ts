export type Role = "USER" | "ADMIN";

export type AuthUser = {
    username: string;
    email?: string;
    token: string;
    role: Role;
    profilePicture?: string;
};
