import React from "react";
import { Edit, Trash2, Check, X } from "lucide-react";
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
}

export const DataTableRow: React.FC<DataTableRowProps> = ({
  item,
  columns,
  headers,
  activeIdEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  const isEditingCurrentItem = activeIdEditing === item.id;
  const isEditingOtherItem = activeIdEditing !== null && activeIdEditing !== item.id;

  const DesktopRow = () => (
    <tr className="border-b border-[#e0dad1]">
      {columns.map(column => (
        <td
          key={column.key}
          className={`p-4 align-middle ${column.width} ${column.className || ""}`}
        >
          {isEditingCurrentItem && column.renderInput
            ? column.renderInput(item[column.key], undefined, item)
            : column.renderDisplay(item[column.key], item)}
        </td>
      ))}

      <td className="p-4 align-middle text-right w-24">
        <div className="flex gap-2 justify-end">
          {isEditingCurrentItem ? (
            <>
              <Button
                variant="ghost"
                className="hover:bg-green-100 text-green-800"
                size="sm"
                onClick={onSave}
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="hover:bg-gray-100 text-gray-800"
                size="sm"
                onClick={onCancel}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hover:bg-stone-300 text-stone-800"
                size="sm"
                onClick={onEdit}
                disabled={isEditingOtherItem}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="hover:bg-red-100 text-red-800"
                size="sm"
                onClick={onDelete}
                disabled={isEditingOtherItem}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const MobileCard = () => (
    <div className="bg-white border border-[#e0dad1] rounded-lg p-4 shadow-sm">
      <div className="space-y-3">
        {columns.map((column, index) => (
          <div
            key={column.key}
            className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 ${column.key === "rating" && isEditingCurrentItem ? "mt-[20px] mb-[30px]" : ""}`}
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

        <div className="flex gap-2 justify-end pt-2 mt-4 border-t border-[#e0dad1]">
          {isEditingCurrentItem ? (
            <>
              <Button
                variant="ghost"
                className="hover:bg-green-100 text-green-800"
                size="sm"
                onClick={onSave}
              >
                <Check className="w-4 h-4" />
                <span className="ml-1">Save</span>
              </Button>
              <Button
                variant="ghost"
                className="hover:bg-gray-100 text-gray-800"
                size="sm"
                onClick={onCancel}
              >
                <X className="w-4 h-4" />
                <span className="ml-1">Cancel</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hover:bg-stone-300 text-stone-800"
                size="sm"
                onClick={onEdit}
                disabled={isEditingOtherItem}
              >
                <Edit className="w-4 h-4" />
                <span className="ml-1">Edit</span>
              </Button>
              <Button
                variant="ghost"
                className="hover:bg-red-100 text-red-800"
                size="sm"
                onClick={onDelete}
                disabled={isEditingOtherItem}
              >
                <Trash2 className="w-4 h-4" />
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
