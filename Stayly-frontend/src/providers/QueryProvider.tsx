import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

import type { ReactNode } from "react";

interface QueryProviderProps {
    children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};