import { QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/home";
import { queryClient } from "@/utils/react-query/query-client";

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default Index;
