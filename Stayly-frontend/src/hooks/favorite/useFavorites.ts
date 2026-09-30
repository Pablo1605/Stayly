import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../api/favoriteApi";
import { favoriteKeys } from "./favoriteKeys";
import { userStore } from "../../store/userStore";

export const useFavorites = () => {

    const isAuthenticated = userStore(
        (state) => state.isAuthenticated
    );

    return useQuery({
        queryKey: favoriteKeys.list(),
        queryFn: getFavorites,
        enabled: isAuthenticated,
    });

};