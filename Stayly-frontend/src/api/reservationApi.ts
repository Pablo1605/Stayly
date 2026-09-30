import type { CreateReservationRequest, Reservation, ReservationStatus, ReservationSummary } from "../types/Reservation";
import apiClient from "./http";

export const createReservation = async (data: CreateReservationRequest): Promise<Reservation> => {
    const response = await apiClient.post("/api/reservations", data);
    return response.data;
}

export const getUserReservations = async (): Promise<ReservationSummary[]> => {
    const response = await apiClient.get("/api/reservations/me");
    return response.data;
}

export const getAllReservations = async (): Promise<Reservation[]> => {
    const response = await apiClient.get("/api/reservations");
    return response.data;
}

export const getAccommodationReservations = async (accommodationId: number): Promise<Reservation[]> => {
    const response = await apiClient.get(`/api/reservations/${accommodationId}`);
    return response.data;
}

export const updateStatus = async (reservationId: number, status: ReservationStatus): Promise<Reservation> => {
    const response = await apiClient.patch(`/api/reservations/${reservationId}/status`, status);
    return response.data;
}

export const deleteReservation = async (reservationId: number): Promise<void> => {
    await apiClient.delete(`/api/reservations/${reservationId}`);
}