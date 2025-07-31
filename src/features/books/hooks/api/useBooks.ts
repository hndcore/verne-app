import type { BookExtended } from "@/features/books/types/book";
import { QUERY_KEYS } from "@/utils/react-query/key-factory";
import { useQuery } from "@tanstack/react-query";

type UseBooksReturnType = {
  data: BookExtended[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const useBooks = (): UseBooksReturnType => {
  const { data, isLoading, isError, refetch } = useQuery<BookExtended[]>({
    queryKey: QUERY_KEYS.books,
    queryFn: async () => {
      // Simulate a network delay to check loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await fetch("/api/books?_expand=author&_expand=genre");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  return { data, isLoading, isError, refetch };
};

export default useBooks;
