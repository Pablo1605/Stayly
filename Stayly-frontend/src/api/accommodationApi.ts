import type { Accommodation, AccommodationStatus, CreateAccommodationRequest, searchAccommodationRequest, UpdateAccommodationRequest } from "../types/Accommodation";
import apiClient from "./http";

export const getAllAccommodations = async (): Promise<Accommodation[]> => {
    const response = await apiClient.get("/api/accommodations");
    return response.data;
}

export const getAccommodation = async (accommodationId: number): Promise<Accommodation> => {
    const response = await apiClient.get(`/api/accommodations/${accommodationId}`);
    return response.data;
}

export const searchAccommodations = async (query: searchAccommodationRequest): Promise<Accommodation[]> => {
    const response = await apiClient.get(`/api/accommodations/search`, { params: query });
    return response.data;
}

export const createAccommodation = async (data: CreateAccommodationRequest): Promise<Accommodation> => {
    const formData = new FormData();
    const { images, ...accommodationData } = data;

    formData.append("data", new Blob([JSON.stringify(accommodationData)], { type: "application/json" }));
    images.forEach((image) => formData.append("images", image));

    const response = await apiClient.post("/api/accommodations", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}

export const updateAccommodation = async (accommodationId: number, data: UpdateAccommodationRequest): Promise<Accommodation> => {
    const response = await apiClient.put(`/api/accommodations/${accommodationId}`, data);
    return response.data;
}

export const deleteAccommodation = async (accommodationId: number): Promise<void> => {
    await apiClient.delete(`/api/accommodations/${accommodationId}`);
}

export const updateAccommodationStatus = async (accommodationId: number, status: AccommodationStatus): Promise<Accommodation> => {
    const response = await apiClient.patch(`/api/accommodations/${accommodationId}/status`, status);
    return response.data;
}