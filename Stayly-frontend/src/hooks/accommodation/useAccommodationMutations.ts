import {useMutation, useQueryClient} from "@tanstack/react-query";

import {createAccommodation, deleteAccommodation, updateAccommodation, updateAccommodationStatus} from "../../api/accommodationApi";

import type {AccommodationStatus, CreateAccommodationRequest, UpdateAccommodationRequest} from "../../types/Accommodation";

import { accommodationKeys } from "./accommodationKeys";

export const useCreateAccommodation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            data: CreateAccommodationRequest
        ) => createAccommodation(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: accommodationKeys.lists(),
            });
        },
    });
};

export const useUpdateAccommodation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            accommodationId,
            data,
        }: {
            accommodationId: number;
            data: UpdateAccommodationRequest;
        }) => updateAccommodation(accommodationId, data),

        onSuccess: (updatedAccommodation) => {
            queryClient.setQueryData(
                accommodationKeys.detail(updatedAccommodation.id),
                updatedAccommodation
            );

            queryClient.invalidateQueries({
                queryKey: accommodationKeys.lists(),
            });
        },
    });
};

export const useDeleteAccommodation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (accommodationId: number) =>
            deleteAccommodation(accommodationId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: accommodationKeys.lists(),
            });
        },
    });
};

export const useUpdateAccommodationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            accommodationId,
            status,
        }: {
            accommodationId: number;
            status: AccommodationStatus;
        }) =>
            updateAccommodationStatus(
                accommodationId,
                status
            ),

        onSuccess: (updatedAccommodation) => {
            queryClient.setQueryData(
                accommodationKeys.detail(updatedAccommodation.id),
                updatedAccommodation
            );

            queryClient.invalidateQueries({
                queryKey: accommodationKeys.lists(),
            });
        },
    });
};