import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Genre } from "@/features/books/types/book";
import { QUERY_KEYS } from "@/utils/react-query/key-factory";
import { toast } from "react-toastify";

export const useGenresMutation = () => {
  const queryClient = useQueryClient();

  const createGenre = useMutation({
    mutationFn: async (data: Omit<Genre, "id">) => {
      const response = await fetch("/api/genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          id: crypto.randomUUID(),
        }),
      });
      if (!response.ok) {
        toast.error("Couldn't create the genre.", { theme: "colored" });
        throw new Error("Couldn't create the genre.");
      }
      return response.json();
    },
    onSuccess: newGenre => {
      toast.success("Genre created successfully", { theme: "colored" });

      const optimisticGenre = {
        ...newGenre,
      };

      queryClient.setQueryData(
        [QUERY_KEYS.genres, { q: newGenre.name }],
        (oldGenres: Genre[] | undefined) => {
          if (!oldGenres) return [optimisticGenre];
          return [...oldGenres, optimisticGenre];
        },
      );

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.genres });
    },
  });

  return {
    createGenre,
  };
};
