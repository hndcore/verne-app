import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { bookSchema } from "../schemas/bookSchema";
import { useBookMutations } from "./api/useBookMutations";

export type BookFormFields = {
  id: string;
  title: string;
  authorId: string;
  genreId: string;
  status: string;
  rating?: number | null;
  dateAdded: string;
};

export const useBookForm = () => {
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<{ id: string; title: string } | null>(null);
  const { updateBook, deleteBook } = useBookMutations();

  const getBookData = (bookExtended: any): BookFormFields => ({
    id: bookExtended.id,
    title: bookExtended.title,
    authorId: bookExtended.author?.id || bookExtended.authorId,
    genreId: bookExtended.genre?.id || bookExtended.genreId,
    status: bookExtended.status,
    rating: bookExtended.rating ?? null,
    dateAdded: bookExtended.dateAdded,
  });

  const form = useForm({
    defaultValues: {
      id: "",
      title: "",
      authorId: "",
      genreId: "",
      status: "",
      rating: null,
      dateAdded: "",
    },
    resolver: yupResolver(bookSchema),
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const handleEdit = (id: string, books?: any[]) => {
    const book = books?.find(b => b.id === id);
    if (book) {
      setEditingBookId(id);
      reset(getBookData(book));
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      // If status is not "completed", set rating to null
      const processedData = {
        ...data,
        rating: data.status === "completed" ? data.rating : null,
      };

      await updateBook.mutateAsync({ id: processedData.id, data: processedData });
      setEditingBookId(null);
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const handleSave = async (_id: string) => {
    handleSubmit(handleFormSubmit, errors => {
      Object.keys(errors).forEach(key => {
        const error = errors[key as keyof typeof errors];
        if (error?.message) {
          toast.error(error.message, { theme: "colored" });
        }
      });
    })();
  };

  const handleCancel = (id: string, books?: any[]) => {
    const book = books?.find(b => b.id === id);
    if (book) {
      reset(getBookData(book));
    }
    setEditingBookId(null);
  };

  const handleDelete = (id: string, books?: any[]) => {
    const book = books?.find(b => b.id === id);
    if (book) {
      setBookToDelete({ id: book.id, title: book.title });
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        await deleteBook.mutateAsync(bookToDelete.id);
        setBookToDelete(null);
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setBookToDelete(null);
  };

  const getFormErrors = (id: string) => {
    if (editingBookId !== id) return {};

    const formErrors: { [key: string]: string } = {};
    Object.keys(errors).forEach(key => {
      const error = errors[key as keyof typeof errors];
      if (error?.message) {
        formErrors[key] = error.message;
      }
    });
    return formErrors;
  };

  return {
    control,
    editingBookId,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    getFormErrors,
    deleteDialogOpen,
    bookToDelete,
    confirmDelete,
    cancelDelete,
    isDeleting: deleteBook.isPending,
  };
};
