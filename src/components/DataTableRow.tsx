import React from "react";
import { Edit, Trash2, Check, X } from "lucide-react";
import type { DataTableColumnConfig } from "@/types/data-table";
import Button from "@/lib/Button/Button";

type DataTableRowProps = {
  item: any;
  columns: DataTableColumnConfig[];
  activeIdEditing?: string | null;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

export const DataTableRow: React.FC<DataTableRowProps> = ({
  item,
  columns,
  activeIdEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  const isEditingCurrentItem = activeIdEditing === item.id;
  const isEditingOtherItem = activeIdEditing !== null && activeIdEditing !== item.id;

  return (
    <tr className="border-b border-[#e0dad1]">
      {columns.map(column => (
        <td
          key={column.key}
          className={`p-4 align-middle ${column.width} ${column.className || ""}`}
        >
          {isEditingCurrentItem && column.renderInput
            ? column.renderInput(item[column.key])
            : column.renderDisplay(item[column.key])}
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
};
