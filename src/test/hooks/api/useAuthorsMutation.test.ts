import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthorsMutation } from "../../../features/books/hooks/api/useAuthorsMutation";
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

describe("useAuthorsMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "test-id", name: "Test Author" }),
    });
  });

  test("can create author", async () => {
    const { result } = renderHook(() => useAuthorsMutation(), { wrapper: wrapper() });

    result.current.createAuthor.mutate({ name: "New Author" });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
