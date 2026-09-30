import { useQuery } from "@tanstack/react-query";
import {getAccommodationReservations,getAllReservations,getUserReservations} from "../../api/reservationApi";
import { reservationKeys } from "./reservationKeys";

export const useReservations = () =>
  useQuery({
    queryKey: reservationKeys.list(),
    queryFn: getAllReservations,
  });

export const useUserReservations = () =>
  useQuery({
    queryKey: reservationKeys.mine(),
    queryFn: getUserReservations,
  });

export const useAccommodationReservations = (accommodationId: number) =>
  useQuery({
    queryKey: reservationKeys.byAccommodation(accommodationId),
    queryFn: () => getAccommodationReservations(accommodationId),
    enabled: Number.isFinite(accommodationId),
  });
