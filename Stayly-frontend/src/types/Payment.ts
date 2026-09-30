export type PaymentMethod = "CARD" | "MERCADO_PAGO" | "PAYPAL";
export type PaymentStatus = "PENDING" | "PAID";

export type Payment = {
    id: number;
    amount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    paidAt: string | null;
}

export type CreatePaymentRequest = {
    reservationId: number;
    paymentMethod: PaymentMethod;
}