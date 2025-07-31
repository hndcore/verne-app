import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Book } from "../../types/book";
import { QUERY_KEYS } from "@/utils/react-query/key-factory";
import { toast } from "react-toastify";

export const useBookMutations = () => {
  const queryClient = useQueryClient();

  const createBook = useMutation({
    mutationFn: async (data: Omit<Book, "id"> & { author?: any; genre?: any }) => {
      const { author, genre, ...bookData } = data;
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookData,
          id: crypto.randomUUID(),
        }),
      });
      if (!response.ok) toast.error("Couldn't create the book.", { theme: "colored" });
      return response.json();
    },
    onSuccess: (newBook, variables) => {
      toast.success("Book created successfully", { theme: "colored" });

      // For optimistic update, include the full author and genre objects
      const optimisticBook = {
        ...newBook,
        author: variables.author,
        genre: variables.genre,
      };

      // Optimistic update for the book list
      queryClient.setQueryData(QUERY_KEYS.books, (oldBooks: any) => {
        if (!oldBooks) return [optimisticBook];
        return [...oldBooks, optimisticBook];
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books });
    },
  });

  const updateBook = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Book> }) => {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        toast.error("Couldn't perform the update of the book.", { theme: "colored" });
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

  const deleteBook = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) toast.error("Couldn't delete the book.", { theme: "colored" });
      return id; // Return the deleted book's ID for optimistic update
    },
    onSuccess: id => {
      toast.success("Book deleted successfully", { theme: "colored" });

      // Optimistic update for the book list
      queryClient.setQueryData(QUERY_KEYS.books, (oldBooks: any) => {
        if (!oldBooks) return oldBooks;
        return oldBooks.filter((book: any) => book.id !== id);
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.books });
    },
  });

  return {
    createBook,
    updateBook,
    deleteBook,
  };
};
