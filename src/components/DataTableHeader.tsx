import { ChevronUp, ChevronDown } from "lucide-react";

export type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

type DataTableHeaderProps = {
  headers: string[];
  colWidths: string[];
  columnKeys?: string[];
  sortConfig: SortConfig;
  onSort?: (key: string) => void;
};

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  headers,
  colWidths,
  columnKeys,
  sortConfig,
  onSort,
}) => {
  const getSortIcon = (headerIndex: number) => {
    if (!onSort || !columnKeys) return null;

    const columnKey = columnKeys[headerIndex];

    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }

    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 opacity-70" />
    ) : (
      <ChevronDown className="w-4 h-4 opacity-70" />
    );
  };

  return (
    <thead className="[&_tr]:border-b">
      <tr className="border-b border-[#e0dad1] bg-[#f2f0eb]">
        {headers.map((header, index) => (
          <th
            key={index}
            className={`h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold ${colWidths[index]} ${
              onSort ? "cursor-pointer hover:bg-[#ede9e1] select-none" : ""
            }`}
            onClick={() => {
              if (onSort && columnKeys) {
                const columnKey = columnKeys[index];
                onSort(columnKey);
              }
            }}
          >
            <div className="flex items-center gap-1">
              {header}
              {onSort && getSortIcon(index)}
            </div>
          </th>
        ))}
        <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold text-right w-24">
          Actions
        </th>
      </tr>
    </thead>
  );
};
