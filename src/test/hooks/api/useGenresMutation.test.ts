import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGenresMutation } from "../../../features/books/hooks/api/useGenresMutation";
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

describe("useGenresMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "test-id", name: "Test Genre" }),
    });
  });

  test("can create genre", async () => {
    const { result } = renderHook(() => useGenresMutation(), { wrapper: wrapper() });

    result.current.createGenre.mutate({ name: "New Genre" });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
