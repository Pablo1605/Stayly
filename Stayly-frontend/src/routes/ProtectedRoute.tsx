import { Navigate, Outlet } from "react-router-dom";
import { userStore } from "../store/userStore";
import type { Role } from "../types/AuthUser";

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles: Role[] }) => {
    const user = userStore((state) => state.user); 

    const hasAccess = user && allowedRoles.includes(user.role);

    return hasAccess ? <Outlet /> : <Navigate to="/" replace />;
};
