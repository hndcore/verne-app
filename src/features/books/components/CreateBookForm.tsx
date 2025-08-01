import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/Dialog";
import Button from "@/lib/Button/Button";
import InputText from "@/lib/InputText/InputText";
import InputLov from "@/lib/InputLov/InputLov";
import InputRate from "@/lib/InputRate/InputRate";
import { useBookMutations } from "../hooks/api/useBookMutations";
import useAuthors from "../hooks/api/useAuthors";
import useGenres from "../hooks/api/useGenres";
import type { BookStatus } from "../types/book";
import { getBadgeTextByStatus } from "../utils/books";
import { Plus } from "lucide-react";
import { useAuthorsMutation } from "../hooks/api/useAuthorsMutation";
import { useGenresMutation } from "../hooks/api/useGenresMutation";

export type CreateBookFormFields = {
  title: string;
  authorId: string;
  genreId: string;
  status: BookStatus;
  rating: number | null;
};

const statusOptions = ["completed", "reading", "not_started", "dropped", "on_hold"];

interface CreateBookFormProps {
  trigger?: React.ReactNode;
  testId?: string;
}

const CreateBookForm: React.FC<CreateBookFormProps> = ({
  trigger,
  testId = "create-book-form",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authorSearch, setAuthorSearch] = useState<string>("");
  const [genreSearch, setGenreSearch] = useState<string>("");

  const { createBook } = useBookMutations();
  const { createAuthor } = useAuthorsMutation();
  const { createGenre } = useGenresMutation();
  const { data: authors } = useAuthors(authorSearch || "");
  const { data: genres } = useGenres(genreSearch || "");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CreateBookFormFields>({
    defaultValues: {
      title: "",
      authorId: "",
      genreId: "",
      status: "not_started" as BookStatus,
      rating: null,
    },
    mode: "onBlur",
  });

  const watchedStatus = watch("status");

  const transformedAuthors = React.useMemo(
    () => (authors || []).map(author => ({ label: author.name, value: author.id })),
    [authors],
  );

  const transformedGenres = React.useMemo(
    () => (genres || []).map(genre => ({ label: genre.name, value: genre.id })),
    [genres],
  );

  const loadAuthors = async (inputValue: string) => {
    setAuthorSearch(inputValue);
    return transformedAuthors.filter(author =>
      author.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const loadGenres = async (inputValue: string) => {
    setGenreSearch(inputValue);
    return transformedGenres.filter(genre =>
      genre.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const onSubmit = async (data: any) => {
    try {
      clearErrors();

      let hasErrors = false;

      if (!data.title?.trim()) {
        setError("title", { message: "Title is required" });
        hasErrors = true;
      }
      if (!data.authorId) {
        setError("authorId", { message: "Author is required" });
        hasErrors = true;
      }
      if (!data.genreId) {
        setError("genreId", { message: "Genre is required" });
        hasErrors = true;
      }
      if (!data.status) {
        setError("status", { message: "Status is required" });
        hasErrors = true;
      }
      if (data.status === "completed" && (!data.rating || data.rating < 1)) {
        setError("rating", { message: "Rating is required for completed books" });
        hasErrors = true;
      }

      if (hasErrors) return;

      const processedData = {
        ...data,
        rating: data.status === "completed" ? data.rating : null,
        dateAdded: new Date().toISOString(),
        author: transformedAuthors.find(a => a.value === data.authorId)
          ? authors?.find(a => a.id === data.authorId)
          : null,
        genre: transformedGenres.find(g => g.value === data.genreId)
          ? genres?.find(g => g.id === data.genreId)
          : null,
      };

      await createBook.mutateAsync(processedData);
      reset();
      setIsOpen(false);
      setAuthorSearch("");
      setGenreSearch("");
    } catch (error) {
      console.error("Failed to create book:", error);
      toast.error("Failed to create book", { theme: "colored" });
    }
  };

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setAuthorSearch("");
    setGenreSearch("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild data-testid={`${testId}-trigger`}>
        {trigger || (
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            testId={`${testId}-add-button`}
          >
            Add Book
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" preventOutsideClick={true} testId={testId}>
        <DialogHeader>
          <DialogTitle data-testid={`${testId}-title`}>Add New Book</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          data-testid={`${testId}-form`}
        >
          <div className="grid grid-cols-1 gap-4">
            <div data-testid={`${testId}-title-field`}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    placeholder="Enter book title"
                    testId={`${testId}-title-input`}
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1" data-testid={`${testId}-title-error`}>
                  {errors.title.message}
                </p>
              )}
            </div>

            <div data-testid={`${testId}-author-field`}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <Controller
                name="authorId"
                control={control}
                render={({ field }) => (
                  <InputLov
                    value={transformedAuthors.find(a => a.value === field.value) || null}
                    onChange={option => field.onChange(option?.value || "")}
                    placeholder="Search and select author"
                    loadOptions={loadAuthors}
                    onCreateOption={async (name: string) => {
                      const newAuthor = await createAuthor.mutateAsync({ name });
                      field.onChange(newAuthor.id);
                    }}
                    testId={`${testId}-author-input`}
                  />
                )}
              />
              {errors.authorId && (
                <p className="text-red-500 text-sm mt-1" data-testid={`${testId}-author-error`}>
                  {errors.authorId.message}
                </p>
              )}
            </div>

            <div data-testid={`${testId}-genre-field`}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <Controller
                name="genreId"
                control={control}
                render={({ field }) => (
                  <InputLov
                    value={transformedGenres.find(g => g.value === field.value) || null}
                    onChange={option => field.onChange(option?.value || "")}
                    placeholder="Search and select genre"
                    loadOptions={loadGenres}
                    onCreateOption={async (name: string) => {
                      const newGenre = await createGenre.mutateAsync({ name });
                      field.onChange(newGenre.id);
                    }}
                    testId={`${testId}-genre-input`}
                  />
                )}
              />
              {errors.genreId && (
                <p className="text-red-500 text-sm mt-1" data-testid={`${testId}-genre-error`}>
                  {errors.genreId.message}
                </p>
              )}
            </div>

            <div data-testid={`${testId}-status-field`}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select
                    value={field.value || ""}
                    onChange={field.onChange}
                    className="w-full border border-amber-300 rounded-lg h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 bg-white"
                    style={{ minHeight: 44 }}
                    data-testid={`${testId}-status-select`}
                  >
                    <option value="">Select status</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {getBadgeTextByStatus(status)}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm mt-1" data-testid={`${testId}-status-error`}>
                  {errors.status.message}
                </p>
              )}
            </div>

            {watchedStatus === "completed" && (
              <div data-testid={`${testId}-rating-field`}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <InputRate
                      value={field.value || 0}
                      onChange={field.onChange}
                      editable={true}
                      testId={`${testId}-rating-input`}
                    />
                  )}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1" data-testid={`${testId}-rating-error`}>
                    {errors.rating.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter data-testid={`${testId}-footer`}>
            <Button variant="secondary" onClick={handleClose} testId={`${testId}-cancel-button`}>
              Cancel
            </Button>
            <Button
              variant="primary"
              loading={createBook.isPending}
              onClick={handleSubmit(onSubmit)}
              testId={`${testId}-submit-button`}
            >
              Create Book
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBookForm;
