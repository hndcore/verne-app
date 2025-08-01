import React, { memo } from "react";
import { Edit, Trash2, Check, X, Eye } from "lucide-react";
import type { DataTableColumnConfig } from "@/types/data-table";
import Button from "@/lib/Button/Button";

interface DataTableRowProps {
  item: any;
  columns: DataTableColumnConfig[];
  headers: string[];
  activeIdEditing: string | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onView?: () => void;
  testId?: string;
}

const DataTableRow: React.FC<DataTableRowProps> = ({
  item,
  columns,
  headers,
  activeIdEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onView,
  testId = "data-table-row",
}) => {
  const isEditingCurrentItem = activeIdEditing === item.id;
  const isEditingOtherItem = activeIdEditing !== null && activeIdEditing !== item.id;

  const DesktopRow = () => (
    <tr className="border-b border-[#e0dad1]" data-testid={`${testId}-${item.id}`}>
      {columns.map(column => (
        <td
          key={column.key}
          className={`p-4 align-middle ${column.width} ${column.className || ""}`}
          data-testid={`${testId}-cell-${column.key}-${item.id}`}
        >
          {isEditingCurrentItem && column.renderInput
            ? column.renderInput(item[column.key], undefined, item)
            : column.renderDisplay(item[column.key], item)}
        </td>
      ))}

      <td className="p-4 align-middle text-right w-28" data-testid={`${testId}-actions-${item.id}`}>
        <div className="flex justify-end">
          {isEditingCurrentItem ? (
            <>
              <Button
                testId={`${testId}-save-button-${item.id}`}
                variant="ghost"
                className="hover:bg-green-100 text-green-800"
                size="sm"
                onClick={onSave}
                aria-label={`Save changes for ${item.title || item.name || "item"}`}
              >
                <Check className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Save</span>
              </Button>
              <Button
                testId={`${testId}-cancel-button-${item.id}`}
                variant="ghost"
                className="hover:bg-gray-100 text-gray-800"
                size="sm"
                onClick={onCancel}
                aria-label={`Cancel editing ${item.title || item.name || "item"}`}
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Cancel</span>
              </Button>
            </>
          ) : (
            <>
              {onView && (
                <Button
                  testId={`${testId}-view-button-${item.id}`}
                  variant="ghost"
                  className="hover:bg-blue-100 text-blue-800"
                  size="sm"
                  onClick={onView}
                  disabled={isEditingOtherItem}
                  aria-label={`View details for ${item.title || item.name || "item"}`}
                >
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">View</span>
                </Button>
              )}
              <Button
                testId={`${testId}-edit-button-${item.id}`}
                variant="ghost"
                className="hover:bg-stone-300 text-stone-800"
                size="sm"
                onClick={onEdit}
                disabled={isEditingOtherItem}
                aria-label={`Edit ${item.title || item.name || "item"}`}
              >
                <Edit className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                testId={`${testId}-delete-button-${item.id}`}
                variant="ghost"
                className="hover:bg-red-100 text-red-800"
                size="sm"
                onClick={onDelete}
                disabled={isEditingOtherItem}
                aria-label={`Delete ${item.title || item.name || "item"}`}
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Delete</span>
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const MobileCard = () => (
    <div
      className="bg-white border border-[#e0dad1] rounded-lg p-4 shadow-sm"
      data-testid={`${testId}-mobile-card-${item.id}`}
    >
      <div className="space-y-3">
        {columns.map((column, index) => (
          <div
            key={column.key}
            className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 ${column.editingStyle && isEditingCurrentItem ? column.editingStyle : ""}`}
            data-testid={`${testId}-mobile-field-${column.key}-${item.id}`}
          >
            <span className="text-sm font-medium text-slate-600 min-w-0 sm:w-1/3">
              {headers[index]}:
            </span>
            <div className="flex-1 min-w-0">
              {isEditingCurrentItem && column.renderInput
                ? column.renderInput(item[column.key], undefined, item)
                : column.renderDisplay(item[column.key], item)}
            </div>
          </div>
        ))}

        <div
          className="flex gap-2 justify-end pt-2 mt-4 border-t border-[#e0dad1]"
          data-testid={`${testId}-mobile-actions-${item.id}`}
        >
          {isEditingCurrentItem ? (
            <>
              <Button
                testId={`${testId}-mobile-save-button-${item.id}`}
                variant="ghost"
                className="hover:bg-green-100 text-green-800"
                size="sm"
                onClick={onSave}
                aria-label={`Save changes for ${item.title || item.name || "item"}`}
              >
                <Check className="w-4 h-4" aria-hidden="true" />
                <span className="ml-1">Save</span>
              </Button>
              <Button
                testId={`${testId}-mobile-cancel-button-${item.id}`}
                variant="ghost"
                className="hover:bg-gray-100 text-gray-800"
                size="sm"
                onClick={onCancel}
                aria-label={`Cancel editing ${item.title || item.name || "item"}`}
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span className="ml-1">Cancel</span>
              </Button>
            </>
          ) : (
            <>
              {onView && (
                <Button
                  testId={`${testId}-mobile-view-button-${item.id}`}
                  variant="ghost"
                  className="hover:bg-blue-100 text-blue-800"
                  size="sm"
                  onClick={onView}
                  disabled={isEditingOtherItem}
                  aria-label={`View details for ${item.title || item.name || "item"}`}
                >
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span className="ml-1">View</span>
                </Button>
              )}
              <Button
                testId={`${testId}-mobile-edit-button-${item.id}`}
                variant="ghost"
                className="hover:bg-stone-300 text-stone-800"
                size="sm"
                onClick={onEdit}
                disabled={isEditingOtherItem}
                aria-label={`Edit ${item.title || item.name || "item"}`}
              >
                <Edit className="w-4 h-4" aria-hidden="true" />
                <span className="ml-1">Edit</span>
              </Button>
              <Button
                testId={`${testId}-mobile-delete-button-${item.id}`}
                variant="ghost"
                className="hover:bg-red-100 text-red-800"
                size="sm"
                onClick={onDelete}
                disabled={isEditingOtherItem}
                aria-label={`Delete ${item.title || item.name || "item"}`}
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                <span className="ml-1">Delete</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:contents">
        <DesktopRow />
      </div>
      <div className="block md:hidden">
        <MobileCard />
      </div>
    </>
  );
};

const MemoizedDataTableRow = memo(DataTableRow);
MemoizedDataTableRow.displayName = "DataTableRow";

export default MemoizedDataTableRow;
