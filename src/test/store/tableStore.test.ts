import { renderHook, act } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { useTableStore } from "../../features/books/store/tableStore";

describe("useTableStore", () => {
  beforeEach(() => {
    const { resetTableState } = useTableStore.getState();
    resetTableState();
  });

  test("has default values", () => {
    const { result } = renderHook(() => useTableStore());

    expect(result.current.searchTerm).toBe("");
    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(5);
  });

  test("can update search", () => {
    const { result } = renderHook(() => useTableStore());

    act(() => result.current.setSearchTerm("test"));
    expect(result.current.searchTerm).toBe("test");
  });

  test("can update page", () => {
    const { result } = renderHook(() => useTableStore());

    act(() => result.current.setCurrentPage(3));
    expect(result.current.currentPage).toBe(3);
  });

  test("can sort", () => {
    const { result } = renderHook(() => useTableStore());

    act(() => result.current.toggleSort("title"));
    expect(result.current.sortConfig.key).toBe("title");
  });
});
