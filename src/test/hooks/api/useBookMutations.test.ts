import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBookMutations } from "../../../features/books/hooks/api/useBookMutations";
import React from "react";

Object.defineProperty(global, "crypto", {
  value: { randomUUID: vi.fn(() => "test-uuid") },
  writable: true,
});

global.fetch = vi.fn();
vi.mock("react-toastify", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const wrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useBookMutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "test-id" }),
    });
  });

  test("has mutations available", () => {
    const { result } = renderHook(() => useBookMutations(), { wrapper: wrapper() });

    expect(result.current.createBook).toBeDefined();
    expect(result.current.updateBook).toBeDefined();
    expect(result.current.deleteBook).toBeDefined();
  });

  test("can create book", async () => {
    const { result } = renderHook(() => useBookMutations(), { wrapper: wrapper() });

    const bookData = {
      title: "Test",
      authorId: "a1",
      genreId: "g1",
      status: "reading" as const,
      rating: 5,
      dateAdded: "2023-01-01",
    };

    result.current.createBook.mutate(bookData);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  test("can update book", async () => {
    const { result } = renderHook(() => useBookMutations(), { wrapper: wrapper() });

    const updateData = {
      id: "1",
      data: { title: "Updated", status: "completed" as const, rating: 4 },
    };

    result.current.updateBook.mutate(updateData);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  test("can delete book", async () => {
    const { result } = renderHook(() => useBookMutations(), { wrapper: wrapper() });

    result.current.deleteBook.mutate("test-id");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
