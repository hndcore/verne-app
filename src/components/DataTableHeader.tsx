type DataTableHeaderProps = {
  headers: string[];
  colWidths: string[];
};

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({ headers, colWidths }) => {
  return (
    <thead className="[&_tr]:border-b">
      <tr className="border-b border-[#e0dad1] bg-[#f2f0eb]">
        {headers.map((header, index) => (
          <th
            key={index}
            className={`h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold ${colWidths[index]}`}
          >
            {header}
          </th>
        ))}
        <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold text-right w-24">
          Actions
        </th>
      </tr>
    </thead>
  );
};
