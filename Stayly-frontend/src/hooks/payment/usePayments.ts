import { useQuery } from "@tanstack/react-query";
import { getPaymentByReservation } from "../../api/paymentApi";
import { paymentKeys } from "./paymentKeys";

export const usePayments = (reservationId: number) =>
  useQuery({
    queryKey: paymentKeys.detail(reservationId),
    queryFn: () => getPaymentByReservation(reservationId),
    enabled: Number.isFinite(reservationId),
  });
