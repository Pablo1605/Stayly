import type { Favorite } from "../types/Favorite";
import apiClient from "./http";

export const getFavorites = async (): Promise<Favorite[]> => {
    const response = await apiClient.get("/api/favorites");
    return response.data;
}

export const addFavorite = async (accommodationId: number): Promise<Favorite> => {
    const response = await apiClient.post(`/api/favorites/${accommodationId}`);
    return response.data;
}

export const removeFavorite = async (accommodationId: number): Promise<void> => {
    await apiClient.delete(`/api/favorites/${accommodationId}`);
}