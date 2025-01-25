"use client"

import { reactQueryTypeProp } from "@/types/myTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }: reactQueryTypeProp) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
