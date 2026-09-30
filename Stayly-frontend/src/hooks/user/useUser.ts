import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../../api/authApi";
import { userStore } from "../../store/userStore";
import { userKeys } from "./userKeys";

export const useUser = () => {
    const token = userStore((state) => state.token);
    const setUser = userStore((state) => state.setUser);

    return useQuery({
        queryKey: userKeys.current(),
        queryFn: async () => {
            const storedUser = userStore.getState().user;
            const currentUser = await fetchCurrentUser(storedUser);
            setUser(currentUser);
            return currentUser;
        },
        enabled: Boolean(token),
        staleTime: 5 * 60 * 1000,
    });
};
