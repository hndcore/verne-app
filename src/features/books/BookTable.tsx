import useBooks from "@/hooks/api/useBooks";
import Button from "@/lib/Button/Button";
import { Plus } from "lucide-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "@/components/DataTable";
import type { DataTableColumnConfig } from "@/types/data-table";
import { getBadgeTextByStatus, getBadgeVariantByStatus } from "@/utils/books";
import Badge from "@/lib/Badge/Badge";
import InputRate from "@/lib/InputRate/InputRate";
import InputText from "@/lib/InputText/InputText";

const BookTable: React.FC = () => {
  const { data: books, isLoading, isError } = useBooks();

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
      renderInput: (value: { name: string }) => <InputText value={value.name} size="sm" />,
    },
    {
      key: "genre",
      header: "Genre",
      width: "w-32",
      renderDisplay: (value: { name: string }) => value.name,
      renderInput: (value: { name: string }) => <InputText value={value.name} size="sm" />,
    },
    {
      key: "status",
      header: "Status",
      width: "w-32",
      renderDisplay: (value: string) => (
        <Badge variant={getBadgeVariantByStatus(value)}>{getBadgeTextByStatus(value)}</Badge>
      ),
      renderInput: (value: string) => <InputText value={value} size="sm" />,
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
      renderInput: (value: string) => <InputText value={value} size="sm" />,
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
