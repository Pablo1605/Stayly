import { useQuery } from "@tanstack/react-query";
import {getAllAccommodations, searchAccommodations} from "../../api/accommodationApi";
import type { searchAccommodationRequest } from "../../types/Accommodation";
import { accommodationKeys } from "./accommodationKeys";

export const useAccommodations = () => {
    return useQuery({
        queryKey: accommodationKeys.list(),
        queryFn: getAllAccommodations,
    });
};

export const useSearchAccommodations = (
    query: searchAccommodationRequest
) => {
    return useQuery({
        queryKey: accommodationKeys.search(query),
        queryFn: () => searchAccommodations(query),
    });
};