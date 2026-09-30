import { useQuery } from "@tanstack/react-query";
import { getAccommodation } from "../../api/accommodationApi";
import { accommodationKeys } from "./accommodationKeys";

export const useAccommodation = (
    accommodationId: number
) => {
    return useQuery({
        queryKey: accommodationKeys.detail(accommodationId),
        queryFn: () => getAccommodation(accommodationId),
        enabled: Boolean(accommodationId),
    });
};