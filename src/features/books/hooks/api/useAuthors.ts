import type { Author } from "@/features/books/types/book";
import { QUERY_KEYS } from "@/utils/react-query/key-factory";
import { useQuery } from "@tanstack/react-query";

type UseAuthorsReturnType = {
  data: Author[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const useAuthors = (q?: string): UseAuthorsReturnType => {
  const { data, isLoading, isError } = useQuery<Author[]>({
    queryKey: [QUERY_KEYS.authors, { q }],
    queryFn: async () => {
      const url = q && q.trim() !== "" ? `/api/authors?q=${encodeURIComponent(q)}` : "/api/authors";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  return { data, isLoading, isError };
};

export default useAuthors;
