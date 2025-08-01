import { renderHook, act } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBookForm } from "../../features/books/hooks/useBookForm";
import React from "react";

vi.mock("../../features/books/hooks/api/useBookMutations", () => ({
  useBookMutations: () => ({
    updateBook: { mutateAsync: vi.fn(), isPending: false },
    deleteBook: { mutateAsync: vi.fn(), isPending: false },
  }),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const wrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useBookForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns initial state correctly", () => {
    const { result } = renderHook(() => useBookForm(), { wrapper: wrapper() });

    expect(result.current.editingBookId).toBe(null);
    expect(result.current.deleteDialogOpen).toBe(false);
  });

  test("enters edit mode when called", () => {
    const { result } = renderHook(() => useBookForm(), { wrapper: wrapper() });

    const books = [
      {
        id: "test-id",
        title: "Test Book",
        authorId: "a1",
        genreId: "g1",
        status: "reading",
        rating: 5,
        dateAdded: "2023-01-01",
      },
    ];

    act(() => result.current.handleEdit("test-id", books));
    expect(result.current.editingBookId).toBe("test-id");
  });

  test("exits edit mode when cancelled", () => {
    const { result } = renderHook(() => useBookForm(), { wrapper: wrapper() });

    act(() => result.current.handleEdit("test-id"));
    act(() => result.current.handleCancel("test-id"));
    expect(result.current.editingBookId).toBe(null);
  });

  test("provides form control methods", () => {
    const { result } = renderHook(() => useBookForm(), { wrapper: wrapper() });

    expect(result.current.control).toBeDefined();
  });
});
