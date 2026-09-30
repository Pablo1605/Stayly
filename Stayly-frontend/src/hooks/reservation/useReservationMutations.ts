import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createReservation, deleteReservation, updateStatus} from "../../api/reservationApi";
import type {CreateReservationRequest,ReservationStatus} from "../../types/Reservation";
import { reservationKeys } from "./reservationKeys";
import { accommodationKeys } from "../accommodation/accommodationKeys";

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationRequest) => createReservation(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.list() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.mine() });
      if (variables.accommodationId !== undefined) {
        queryClient.invalidateQueries({ queryKey: accommodationKeys.detail(variables.accommodationId) });
      }
    },
  });
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, status }: { reservationId: number; status: ReservationStatus }) =>
      updateStatus(reservationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.list() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.mine() });
      queryClient.invalidateQueries({ queryKey: accommodationKeys.all });
    },
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) => deleteReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reservationKeys.list() });
      queryClient.invalidateQueries({ queryKey: reservationKeys.mine() });
      queryClient.invalidateQueries({ queryKey: accommodationKeys.all });
    },
  });
};
