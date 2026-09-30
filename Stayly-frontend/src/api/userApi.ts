import apiClient from "./http";

export const getUserCount = async (): Promise<number> => {
    const response = await apiClient.get("/api/users/count");
    return response.data;
};