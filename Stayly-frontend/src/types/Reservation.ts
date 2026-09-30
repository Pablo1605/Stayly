import type { AccommodationCard } from "./Accommodation";
import type { Payment } from "./Payment";

export type ReservationStatus = 'PENDING' | 'COMPLETED' | 'CANCELED';

export type Reservation = {
    id: number;
    checkIn: string;
    checkOut: string;
    createdAt: string;
    guests: number;
    totalPrice: number;
    status: ReservationStatus;
    accommodation: AccommodationCard;
    payment: Payment;
}

export type CreateReservationRequest = {
    checkIn: string;
    checkOut: string;
    guests: number;
    accommodationId?: number;
}

export type UpdateReservationRequest = {
    status: ReservationStatus;
}

export type ReservationSummary = {
    id: number;
    accommodationId: number;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: ReservationStatus;
    title: string;
    city: string;
    image: string;
}