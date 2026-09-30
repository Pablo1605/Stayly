import type { CreatePaymentRequest, Payment } from "../types/Payment";
import apiClient from "./http";

export const createPayment = async(data: CreatePaymentRequest): Promise<Payment> => {
    const response = await apiClient.post("/api/payments/", data);
    return response.data;
}

export const confirmPayment = async(paymentId: number) => {
    const response = await apiClient.post(`/api/payments/${paymentId}/confirm`);
    return response.data;
}

export const getPaymentByReservation = async(reservationId: number): Promise<Payment> => {
    const response = await apiClient.get(`/api/payments/${reservationId}`);
    return response.data;
}