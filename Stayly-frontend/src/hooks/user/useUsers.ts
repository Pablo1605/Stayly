import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./userKeys";

export const useUsers = () =>
  useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => [],
    staleTime: Infinity,
  });
