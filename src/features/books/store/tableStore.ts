import { create } from "zustand";

export type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

export type TableState = {
  searchTerm: string;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  sortConfig: SortConfig;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalItems: (total: number) => void;
  setSortConfig: (config: SortConfig) => void;
  toggleSort: (key: string) => void;
  resetTableState: () => void;
};

export const useTableStore = create<TableState>((set, get) => ({
  searchTerm: "",
  currentPage: 1,
  pageSize: 5,
  totalItems: 0,
  sortConfig: { key: "dateAdded", direction: "desc" as const },
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setTotalItems: (total: number) => set({ totalItems: total }),
  setSortConfig: (config: SortConfig) => set({ sortConfig: config }),
  resetTableState: () =>
    set({
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      sortConfig: { key: "dateAdded", direction: "desc" },
    }),
  toggleSort: (key: string) => {
    const { sortConfig } = get();
    let newConfig: SortConfig;

    if (sortConfig.key === key) {
      newConfig = {
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      };
    } else {
      newConfig = {
        key,
        direction: "asc",
      };
    }

    set({
      sortConfig: newConfig,
      currentPage: 1,
    });
  },
}));
