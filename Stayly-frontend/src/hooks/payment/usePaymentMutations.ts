import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmPayment, createPayment } from "../../api/paymentApi";
import type { CreatePaymentRequest } from "../../types/Payment";
import { paymentKeys } from "./paymentKeys";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePaymentRequest) => createPayment(data),
    onSuccess: (payment) => {
      queryClient.setQueryData(paymentKeys.detail(payment.id), payment);
      queryClient.invalidateQueries({ queryKey: paymentKeys.list() });
    },
  });
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: number) => confirmPayment(paymentId),
    onSuccess: (payment) => {
      queryClient.setQueryData(paymentKeys.detail(payment.id), payment);
      queryClient.invalidateQueries({ queryKey: paymentKeys.list() });
    },
  });
};
