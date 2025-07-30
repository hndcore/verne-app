import type { BookExtended } from "@/features/books/types/book";
import { Loader2 } from "lucide-react";
import React from "react";
import { DataTableHeader } from "./DataTableHeader";
import type { DataTableColumnConfig } from "@/types/data-table";
import { DataTableRow } from "./DataTableRow";

type DataTableProps = {
  books: BookExtended[] | undefined;
  columns: DataTableColumnConfig[];
  isLoading: boolean;
  isError: boolean;
  testId?: string;
  headers: string[];
  colWidths: string[];
  activeIdEditing?: string | null;
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
};

const DataTable: React.FC<DataTableProps> = ({
  books,
  columns,
  isLoading,
  isError,
  testId = "data-table",
  headers,
  colWidths,
  activeIdEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  const handleEdit = (id: string) => {
    onEdit(id);
  };

  const handleSave = (id: string) => {
    onSave(id);
  };

  const handleCancel = (id: string) => {
    onCancel(id);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  if (isError) {
    return (
      <div className="p-4 text-red-800" data-testid={`${testId}-error`}>
        Error loading books
      </div>
    );
  }

  if (isLoading) {
    return (
      <Loader2
        className="w-24 h-24 text-amber-500 animate-spin"
        data-testid={`${testId}-loading`}
      />
    );
  }

  return (
    <div className="w-full border border-[#e0dad1]">
      <div className="relative w-full overflow-auto">
        <table className="w-full table-fixed caption-bottom text-sm">
          <colgroup>
            {colWidths.map((w, i) => (
              <col key={i} className={w} />
            ))}
            <col className="w-24" />
          </colgroup>
          <DataTableHeader headers={headers} colWidths={colWidths} />
          <tbody className="[&_tr:last-child]:border-0">
            {(books ?? []).length === 0 ? (
              <tr className="border-b border-[#e0dad1]">
                <td
                  colSpan={colWidths.length + 1}
                  className="p-4 align-middle text-center py-8 text-stone-500"
                >
                  No books in your collection yet. Add your first book to get started!
                </td>
              </tr>
            ) : (
              (books ?? []).map((book: any) => (
                <DataTableRow
                  key={book.id}
                  item={book}
                  columns={columns}
                  activeIdEditing={activeIdEditing || null}
                  onEdit={() => handleEdit(book.id)}
                  onSave={() => handleSave(book.id)}
                  onCancel={() => handleCancel(book.id)}
                  onDelete={() => handleDelete(book.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
