import type { AuthUser, Role } from "../types/AuthUser";
import type { LoginRequest } from "../types/LoginRequest";
import type { RegisterRequest } from "../types/RegisterRequest";
import { decodeJwtPayload } from "../utils/jwt";
import apiClient from "./http";

type AuthResponse = {
    token?: string;
    username?: string;
    email?: string;
    role?: Role;
};

const mapAuthUser = (data: AuthResponse, fallback?: AuthUser | null): AuthUser => {
    const token = data.token ?? fallback?.token ?? "";
    const jwtPayload = decodeJwtPayload(token);

    return {
        token,
        username: data.username ?? jwtPayload?.sub ?? fallback?.username ?? "",
        email: data.email ?? jwtPayload?.email ?? fallback?.email,
        role: data.role ?? fallback?.role ?? "USER",
        profilePicture: fallback?.profilePicture,
    };
};

export const registerUser = async (data: RegisterRequest): Promise<void> => {
    await apiClient.post("/api/auth/register", data);
};

export const loginUser = async (data: LoginRequest): Promise<AuthUser> => {
    const response = await apiClient.post<AuthResponse>("/api/auth/login", data);
    return mapAuthUser(response.data);
};

export const fetchCurrentUser = async (fallback?: AuthUser | null): Promise<AuthUser> => {
    const response = await apiClient.get<AuthResponse>("/api/users/me");
    return mapAuthUser(response.data, fallback);
};
