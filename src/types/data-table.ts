type DataTableColumnConfig = {
  key: string;
  header: string;
  width: string;
  className?: string;
  renderDisplay: (value: any) => React.ReactNode;
  renderInput?: (value: any) => React.ReactNode;
};

export type { DataTableColumnConfig };
