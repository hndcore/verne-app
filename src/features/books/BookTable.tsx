import useBooks from "./hooks/api/useBooks";
import Button from "@/lib/Button/Button";
import { Plus } from "lucide-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "@/components/DataTable";
import useAuthors from "./hooks/api/useAuthors";
import useGenres from "./hooks/api/useGenres";
import { useBookForm } from "./hooks/useBookForm";
import { createBookColumns } from "./config/bookTableColumns";

const BookTable: React.FC = () => {
  const [authorSearch, setAuthorSearch] = React.useState<string>("");
  const [genresSearch, setGenresSearch] = React.useState<string>("");
  const { data: books, isLoading, isError } = useBooks();
  const { data: authors } = useAuthors(authorSearch || undefined);
  const { data: genres } = useGenres(genresSearch || undefined);

  const {
    control,
    editingBookId,
    handleEdit: formHandleEdit,
    handleSave,
    handleCancel: formHandleCancel,
    handleDelete,
  } = useBookForm();

  const handleEdit = (id: string) => {
    formHandleEdit(id, books);
  };

  const handleCancel = (id: string) => {
    formHandleCancel(id, books);
  };

  if (isError) return <div>Error loading books</div>;

  const columns = createBookColumns({
    control: control as any,
    authors,
    genres,
    setAuthorSearch,
    setGenresSearch,
  });

  return (
    <section className="border border-[#e0dad1] shadow-sm rounded-lg bg-[#f7f6f2]">
      <ToastContainer />
      <header className="flex flex-col space-y-1.5 p-6 flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Your Literary Collection</h1>
        <Button
          disabled={isError}
          loading={isLoading}
          variant="primary"
          size="md"
          onClick={() => toast.success("Add Book button clicked!", { theme: "colored" })}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Book
        </Button>
      </header>

      <div className="p-6 pt-0 flex flex-col items-center">
        <DataTable
          books={books}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          headers={columns.map(col => col.header)}
          colWidths={columns.map(col => col.width)}
          activeIdEditing={editingBookId}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
};

export default BookTable;
