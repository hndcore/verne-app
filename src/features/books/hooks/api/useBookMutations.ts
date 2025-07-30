import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Book } from "../../types/book";
import { QUERY_KEYS } from "@/utils/react-query/key-factory";
import { toast } from "react-toastify";

export const useBookMutations = () => {
  const queryClient = useQueryClient();

  const updateBook = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Book> }) => {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update book");
      return response.json();
    },
    onSuccess: (updatedBook, { id }) => {
      toast.success("Book updated successfully", { theme: "colored" });

      // I needed an optimistic update because the book list is not instantly refetched after the update
      // with the invalidateQueries function
      queryClient.setQueryData(QUERY_KEYS.books, (oldBooks: any) => {
        if (!oldBooks) return oldBooks;
        return oldBooks.map((book: any) => (book.id === id ? { ...book, ...updatedBook } : book));
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books });
    },
  });

  return {
    updateBook,
  };
};
