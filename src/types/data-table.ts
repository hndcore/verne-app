import type { ReactNode } from "react";

export type DataTableColumnConfig = {
  key: string;
  header: string;
  width: string;
  className?: string;
  renderDisplay: (value: any, item?: any) => ReactNode;
  renderInput?: (value: any, error?: string, item?: any) => ReactNode;
};
