import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite, removeFavorite } from "../../api/favoriteApi";
import { favoriteKeys } from "./favoriteKeys";

export const useFavoriteMutations = () => {

    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: addFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: favoriteKeys.all
            });
        }
    });

    const removeMutation = useMutation({
        mutationFn: removeFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: favoriteKeys.all
            });
        }
    });

    return {
        addFavorite: addMutation.mutate,
        removeFavorite: removeMutation.mutate
    };
};