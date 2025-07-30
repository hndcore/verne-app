import useBooks from "@/hooks/api/useBooks";
import Button from "@/lib/Button/Button";
import { Plus } from "lucide-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "@/components/DataTable";
import type { DataTableColumnConfig } from "@/types/data-table";
import { getBadgeTextByStatus, getBadgeVariantByStatus } from "@/utils/books";
import Badge from "@/lib/Badge/Badge";
// ...existing code...
import InputRate from "@/lib/InputRate/InputRate";
import InputText from "@/lib/InputText/InputText";
import useAuthors from "@/hooks/api/useAuthors";
import InputLov from "@/lib/InputLov/InputLov";
import useGenres from "@/hooks/api/useGenres";

const BookTable: React.FC = () => {
  const [authorSearch, setAuthorSearch] = React.useState<string>("");
  const [genresSearch, setGenresSearch] = React.useState<string>("");
  const { data: books, isLoading, isError } = useBooks();
  const { data: authors } = useAuthors(authorSearch || undefined);
  const { data: genres } = useGenres(genresSearch || undefined);

  if (isError) return <div>Error loading books</div>;

  const columns: DataTableColumnConfig[] = [
    {
      key: "title",
      header: "Title",
      width: "w-64",
      className: "font-medium",
      renderDisplay: (value: string) => value,
      renderInput: (value: string) => <InputText value={value} size="sm" />,
    },
    {
      key: "author",
      header: "Author",
      width: "w-40",
      renderDisplay: (value: { name: string }) => value.name,
      renderInput: () => (
        <InputLov
          value={null}
          loadOptions={async inputValue => {
            setAuthorSearch(inputValue);
            return (authors ?? []).map((a: { name: string; id: string }) => ({
              label: a.name,
              value: a.id,
            }));
          }}
        />
      ),
    },
    {
      key: "genre",
      header: "Genre",
      width: "w-32",
      renderDisplay: (value: { name: string }) => value.name,
      renderInput: () => (
        <InputLov
          value={null}
          loadOptions={async inputValue => {
            setGenresSearch(inputValue);
            return (genres ?? []).map((g: { name: string; id: string }) => ({
              label: g.name,
              value: g.id,
            }));
          }}
        />
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      renderDisplay: (value: string) => (
        <Badge variant={getBadgeVariantByStatus(value)}>{getBadgeTextByStatus(value)}</Badge>
      ),
      renderInput: (value: string, onChange?: (val: string) => void) => {
        const statusOptions = ["completed", "reading", "not_started", "dropped", "on_hold"];
        return (
          <select
            value={value}
            onChange={e => onChange && onChange(e.target.value)}
            className={`w-full border border-amber-300 rounded-lg h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 bg-white`}
            style={{ minHeight: 44 }}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {getBadgeTextByStatus(status)}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      key: "rating",
      header: "Rating",
      width: "w-40 p-2",
      renderDisplay: (value: number) =>
        value && <InputRate value={value} editable={false} size="xs" />,
      renderInput: (value: number) => (
        <InputRate value={value} editable={true} className="mt-[-10px]" size="xs" />
      ),
    },
    {
      key: "dateAdded",
      header: "Date Added",
      width: "w-24",
      renderDisplay: (value: string) => value,
      renderInput: (value: string) => <InputText value={value} size="sm" disabled />,
    },
  ];

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
        />
      </div>
    </section>
  );
};

export default BookTable;
