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
import DetailedBookDialog from "./DetailedBookDialog";
import { useTableStore } from "../store/tableStore";
import { useAuthorsMutation } from "../hooks/api/useAuthorsMutation";
import { useGenresMutation } from "../hooks/api/useGenresMutation";
import type { Control } from "react-hook-form";
import { applyFilterToBooks, sortBooks } from "../utils/books";
import InputText from "@/lib/InputText/InputText";
import { useDebounce } from "use-debounce";
import type { BookExtended } from "../types/book";

const BookTable: React.FC = () => {
  const [authorSearch, setAuthorSearch] = React.useState<string>("");
  const [genresSearch, setGenresSearch] = React.useState<string>("");
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
  const [bookToView, setBookToView] = React.useState<BookExtended | null>(null);
  const { data: books, isLoading, isError } = useBooks();
  const { data: authors } = useAuthors(authorSearch || undefined);
  const { data: genres } = useGenres(genresSearch || undefined);
  const { createAuthor } = useAuthorsMutation();
  const { createGenre } = useGenresMutation();

  const {
    searchTerm,
    currentPage,
    pageSize,
    sortConfig,
    setCurrentPage,
    setTotalItems,
    toggleSort,
    setSearchTerm,
  } = useTableStore();

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const filteredBooks = React.useMemo(() => {
    if (!books) return [];
    return applyFilterToBooks(books, debouncedSearchTerm);
  }, [books, debouncedSearchTerm]);

  const totalPages = filteredBooks ? Math.ceil(filteredBooks.length / pageSize) : 0;

  React.useEffect(() => {
    const totalItems = filteredBooks?.length || 0;
    setTotalItems(totalItems);
    if (filteredBooks && filteredBooks.length > 0) {
      const maxPages = Math.ceil(filteredBooks.length / pageSize);
      if (currentPage > maxPages) {
        setCurrentPage(maxPages);
      }
    } else if (filteredBooks && filteredBooks.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredBooks, currentPage, pageSize, setCurrentPage, setTotalItems]);

  const processedBooks = React.useMemo(() => {
    if (!filteredBooks || filteredBooks.length === 0) return [];
    const sortedBooks = sortBooks(filteredBooks, sortConfig);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedBooks.slice(startIndex, endIndex);
  }, [filteredBooks, sortConfig, currentPage, pageSize]);

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

  const handleView = (id: string) => {
    const book = books?.find(b => b.id === id);
    if (book) {
      setBookToView(book);
      setViewDialogOpen(true);
    }
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
    <section
      className="border border-[#e0dad1] shadow-sm rounded-lg bg-[#f7f6f2]"
      data-testid="book-table"
    >
      <ToastContainer />
      <header
        className="flex flex-col space-y-1.5 p-6 flex-row items-center justify-between"
        data-testid="book-table-header"
      >
        <h1 className="text-2xl font-bold text-stone-800" data-testid="book-table-title">
          Your Literary Collection
        </h1>
        <CreateBookForm testId="book-table-create-form" />
      </header>

      <div className="p-6 pt-0 flex flex-col items-center gap-4" data-testid="book-table-content">
        <InputText
          disabled={isLoading}
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search..."
          testId="book-table-search"
        />
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
          onView={handleView}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredBooks?.length || 0}
          onPageChange={setCurrentPage}
          sortConfig={sortConfig}
          onSort={toggleSort}
          emptyMessage="No books in your collection yet. Add your first book to get started!"
          testId="book-table-data"
        />
      </div>

      <DeleteBookDialog
        isOpen={deleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        bookTitle={bookToDelete?.title}
        isDeleting={isDeleting}
        testId="book-table-delete-dialog"
      />

      {bookToView && (
        <DetailedBookDialog
          book={bookToView}
          isOpen={viewDialogOpen}
          onClose={() => {
            setViewDialogOpen(false);
            setBookToView(null);
          }}
          testId="book-table-detail-dialog"
        />
      )}
    </section>
  );
};

export default BookTable;
