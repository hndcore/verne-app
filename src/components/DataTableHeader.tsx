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
  testId?: string;
};

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  headers,
  colWidths,
  columnKeys,
  sortConfig,
  onSort,
  testId = "data-table-header",
}) => {
  const getSortIcon = (headerIndex: number) => {
    if (!onSort || !columnKeys) return null;

    const columnKey = columnKeys[headerIndex];

    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }

    return sortConfig.direction === "asc" ? (
      <ChevronUp
        className="w-4 h-4 opacity-70"
        data-testid={`${testId}-sort-icon-asc-${columnKey}`}
      />
    ) : (
      <ChevronDown
        className="w-4 h-4 opacity-70"
        data-testid={`${testId}-sort-icon-desc-${columnKey}`}
      />
    );
  };

  return (
    <thead className="[&_tr]:border-b" data-testid={`${testId}-thead`}>
      <tr className="border-b border-[#e0dad1] bg-[#f2f0eb]" data-testid={`${testId}-row`}>
        {headers.map((header, index) => (
          <th
            key={index}
            data-testid={`${testId}-cell-${columnKeys?.[index] || index}`}
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
            <div
              className="flex items-center gap-1"
              data-testid={`${testId}-content-${columnKeys?.[index] || index}`}
            >
              {header}
              {onSort && getSortIcon(index)}
            </div>
          </th>
        ))}
        <th
          className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold text-right w-24"
          data-testid={`${testId}-actions-cell`}
        >
          Actions
        </th>
      </tr>
    </thead>
  );
};
