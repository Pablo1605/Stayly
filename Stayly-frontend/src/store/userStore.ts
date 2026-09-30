import { create } from "zustand";

import type { AuthUser } from "../types/AuthUser";
import { queryClient } from "../providers/queryClient";
import { decodeJwtPayload } from "../utils/jwt";

interface UserState {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: AuthUser) => void;
    logout: () => void;
    setUser: (user: AuthUser | null) => void;
}

const hydrateUserEmail = (user: AuthUser): AuthUser => {
    if (user.email) {
        return user;
    }

    const email = decodeJwtPayload(user.token)?.email;
    return email ? { ...user, email } : user;
};

const persistUser = (user: AuthUser) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("token", user.token);
};

const loadUserFromStorage = (): AuthUser | null => {
    try {
        const stored = localStorage.getItem("authUser");
        if (!stored) {
            return null;
        }

        return hydrateUserEmail(JSON.parse(stored) as AuthUser);
    } catch {
        return null;
    }
};

const getStoredToken = (): string | null =>
    localStorage.getItem("token");

export const userStore = create<UserState>((set) => ({
    user: loadUserFromStorage(),
    token: getStoredToken(),
    isAuthenticated: Boolean(getStoredToken()),

    login: (user: AuthUser) => {
        const nextUser = hydrateUserEmail(user);

        set({
            user: nextUser,
            token: nextUser.token,
            isAuthenticated: true,
        });

        persistUser(nextUser);
    },

    logout: () => {
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });

        localStorage.removeItem("authUser");
        localStorage.removeItem("token");
        queryClient.clear();
    },

    setUser: (user: AuthUser | null) => {
        if (!user) {
            set({
                user: null,
                token: null,
                isAuthenticated: false,
            });
            localStorage.removeItem("authUser");
            localStorage.removeItem("token");
            return;
        }

        const nextUser = hydrateUserEmail(user);
        const nextToken = nextUser.token ?? null;

        set({
            user: nextUser,
            token: nextToken,
            isAuthenticated: Boolean(nextToken),
        });

        persistUser(nextUser);
    },
}));
