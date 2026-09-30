import type { searchAccommodationRequest } from "../../types/Accommodation";

export const accommodationKeys = {
    all: ["accommodations"] as const,
    lists: () =>
        [...accommodationKeys.all, "list"] as const,
    list: () =>
        [...accommodationKeys.lists()] as const,
    detail: (accommodationId: number) =>
        [...accommodationKeys.all, "detail", accommodationId] as const,
    search: (query: searchAccommodationRequest) =>
        [...accommodationKeys.all, "search", query] as const,
};