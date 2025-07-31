import useBooks from "../hooks/api/useBooks";
import React from "react";
import { ToastContainer } from "react-toastify";
import DataTable from "@/components/DataTable";
import useAuthors from "../hooks/api/useAuthors";
import useGenres from "../hooks/api/useGenres";
import { useBookForm, type BookFormFields } from "../hooks/useBookForm";
import { createBookColumns } from "../config/bookTableColumns";
import CreateBookForm from "./CreateBookForm";
import DeleteBookDialog from "./DeleteBookDialog";
import { useTableStore } from "../store/tableStore";
import { useAuthorsMutation } from "../hooks/api/useAuthorsMutation";
import { useGenresMutation } from "../hooks/api/useGenresMutation";
import type { Control } from "react-hook-form";
import { sortBooks } from "../utils/books";

const BookTable: React.FC = () => {
  const [authorSearch, setAuthorSearch] = React.useState<string>("");
  const [genresSearch, setGenresSearch] = React.useState<string>("");
  const { data: books, isLoading, isError } = useBooks();
  const { data: authors } = useAuthors(authorSearch || undefined);
  const { data: genres } = useGenres(genresSearch || undefined);
  const { createAuthor } = useAuthorsMutation();
  const { createGenre } = useGenresMutation();

  const { currentPage, pageSize, sortConfig, setCurrentPage, setTotalItems, toggleSort } =
    useTableStore();

  React.useEffect(() => {
    if (books) {
      setTotalItems(books.length);
    }
  }, [books, setTotalItems]);

  React.useEffect(() => {
    if (books && books.length > 0) {
      const maxPages = Math.ceil(books.length / pageSize);
      if (currentPage > maxPages) {
        setCurrentPage(maxPages);
      }
    } else if (books && books.length === 0) {
      setCurrentPage(1);
    }
  }, [books, currentPage, pageSize, setCurrentPage]);

  const processedBooks = React.useMemo(() => {
    if (!books) return [];
    const sortedBooks = sortBooks(books, sortConfig);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedBooks.slice(startIndex, endIndex);
  }, [books, sortConfig, currentPage, pageSize]);

  const totalPages = books ? Math.ceil(books.length / pageSize) : 0;

  const {
    control,
    editingBookId,
    handleEdit: formHandleEdit,
    handleSave,
    handleCancel: formHandleCancel,
    handleDelete,
    deleteDialogOpen,
    bookToDelete,
    confirmDelete,
    cancelDelete,
    isDeleting,
  } = useBookForm();

  const handleEdit = (id: string) => {
    formHandleEdit(id, books);
  };

  const handleCancel = (id: string) => {
    formHandleCancel(id, books);
  };

  const handleDeleteBook = (id: string) => {
    handleDelete(id, books);
  };

  const addAuthor = async (name: string) => {
    await createAuthor.mutateAsync({ name });
  };

  const addGenre = async (name: string) => {
    await createGenre.mutateAsync({ name });
  };

  if (isError) return <div>Error loading books</div>;

  const columns = createBookColumns({
    control: control as Control<BookFormFields>,
    authors,
    genres,
    setAuthorSearch,
    setGenresSearch,
    addAuthor,
    addGenre,
  });

  return (
    <section className="border border-[#e0dad1] shadow-sm rounded-lg bg-[#f7f6f2]">
      <ToastContainer />
      <header className="flex flex-col space-y-1.5 p-6 flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Your Literary Collection</h1>
        <CreateBookForm />
      </header>

      <div className="p-6 pt-0 flex flex-col items-center">
        <DataTable
          data={processedBooks}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          headers={columns.map(col => col.header)}
          colWidths={columns.map(col => col.width)}
          activeIdEditing={editingBookId}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDeleteBook}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={books?.length || 0}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={toggleSort}
          emptyMessage="No books in your collection yet. Add your first book to get started!"
        />
      </div>

      <DeleteBookDialog
        isOpen={deleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        bookTitle={bookToDelete?.title}
        isDeleting={isDeleting}
      />
    </section>
  );
};

export default BookTable;
