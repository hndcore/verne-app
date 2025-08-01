import { Loader2 } from "lucide-react";
import { DataTableHeader } from "./DataTableHeader";
import type { DataTableColumnConfig } from "@/types/data-table";
import { DataTableRow } from "./DataTableRow";
import Pagination from "./Pagination";
import type { SortConfig } from "./DataTableHeader";

type DataTableProps<T> = {
  data: T[] | undefined;
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
  onView?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  sortConfig: SortConfig;
  onSort?: (key: string) => void;
  emptyMessage?: string;
};

const DataTable: React.FC<DataTableProps<{ id: string }>> = ({
  data,
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
  onView,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  sortConfig,
  onSort,
  emptyMessage = "No data available",
}) => {
  if (isError) {
    return (
      <div className="p-4 text-red-800" data-testid={`${testId}-error`}>
        Error loading data
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2
          className="w-24 h-24 text-amber-500 animate-spin"
          data-testid={`${testId}-loading`}
        />
      </div>
    );
  }

  const showPagination = currentPage && totalPages && pageSize && totalItems && onPageChange;

  return (
    <div className="w-full border border-[#e0dad1]" data-testid={`${testId}-container`}>
      <div
        className="hidden md:block relative w-full overflow-auto"
        data-testid={`${testId}-desktop-view`}
      >
        <table
          className="w-full table-fixed caption-bottom text-sm"
          data-testid={`${testId}-table`}
        >
          <colgroup>
            {colWidths.map((w, i) => (
              <col key={i} className={w} />
            ))}
            <col className="w-24" />
          </colgroup>
          <DataTableHeader
            headers={headers}
            colWidths={colWidths}
            columnKeys={columns.map(col => col.key)}
            sortConfig={sortConfig}
            onSort={onSort}
            testId={`${testId}-header`}
          />
          <tbody className="[&_tr:last-child]:border-0" data-testid={`${testId}-tbody`}>
            {(data ?? []).length === 0 ? (
              <tr className="border-b border-[#e0dad1]" data-testid={`${testId}-empty-row`}>
                <td
                  colSpan={colWidths.length + 1}
                  className="p-4 align-middle text-center py-8 text-stone-500"
                  data-testid={`${testId}-empty-message`}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              (data ?? []).map(item => (
                <DataTableRow
                  key={item.id}
                  item={item}
                  columns={columns}
                  headers={headers}
                  activeIdEditing={activeIdEditing || null}
                  onEdit={() => onEdit(item.id)}
                  onSave={() => onSave(item.id)}
                  onCancel={() => onCancel(item.id)}
                  onDelete={() => onDelete(item.id)}
                  onView={onView ? () => onView(item.id) : undefined}
                  testId={`${testId}-row`}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden" data-testid={`${testId}-mobile-view`}>
        {(data ?? []).length === 0 ? (
          <div
            className="p-4 text-center py-8 text-stone-500"
            data-testid={`${testId}-mobile-empty-message`}
          >
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-4 p-4" data-testid={`${testId}-mobile-container`}>
            {(data ?? []).map(item => (
              <DataTableRow
                key={item.id}
                item={item}
                columns={columns}
                headers={headers}
                activeIdEditing={activeIdEditing || null}
                onEdit={() => onEdit(item.id)}
                onSave={() => onSave(item.id)}
                onCancel={() => onCancel(item.id)}
                onDelete={() => onDelete(item.id)}
                onView={onView ? () => onView(item.id) : undefined}
                testId={`${testId}-row`}
              />
            ))}
          </div>
        )}
      </div>

      {showPagination ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
          testId={`${testId}-pagination`}
        />
      ) : null}
    </div>
  );
};

export default DataTable;
