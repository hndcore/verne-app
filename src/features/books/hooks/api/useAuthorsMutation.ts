import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Author } from "@/features/books/types/book";
import { QUERY_KEYS } from "@/utils/react-query/key-factory";
import { toast } from "react-toastify";

export const useAuthorsMutation = () => {
  const queryClient = useQueryClient();

  const createAuthor = useMutation({
    mutationFn: async (data: Omit<Author, "id">) => {
      const response = await fetch("/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          id: crypto.randomUUID(),
        }),
      });
      if (!response.ok) {
        toast.error("Couldn't create the author.", { theme: "colored" });
        throw new Error("Couldn't create the author.");
      }
      return response.json();
    },
    onSuccess: newAuthor => {
      toast.success("Author created successfully", { theme: "colored" });

      const optimisticAuthor = {
        ...newAuthor,
      };

      queryClient.setQueryData(QUERY_KEYS.authors, (oldAuthors: Author[] | undefined) => {
        if (!oldAuthors) return [optimisticAuthor];
        return [...oldAuthors, optimisticAuthor];
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.authors });
    },
  });

  return {
    createAuthor,
  };
};
