import type { Genre } from "@/features/books/types/book";
import { QUERY_KEYS } from "@/utils/react-query/key-factory";
import { useQuery } from "@tanstack/react-query";

type UseGenresReturnType = {
  data: Genre[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const useGenres = (q?: string): UseGenresReturnType => {
  const { data, isLoading, isError } = useQuery<Genre[]>({
    queryKey: [QUERY_KEYS.genres, { q }],
    queryFn: async () => {
      const url = q ? `/api/genres?q=${encodeURIComponent(q)}` : "/api/genres";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!q,
  });

  return { data, isLoading, isError };
};

export default useGenres;
