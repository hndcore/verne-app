import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateBookForm from "../../features/books/components/CreateBookForm";

vi.mock("../hooks/api/useBookMutations", () => ({
  useBookMutations: () => ({
    createBook: { mutateAsync: vi.fn(), isPending: false },
  }),
}));

vi.mock("../hooks/api/useAuthors", () => ({
  default: () => ({ data: [] }),
}));

vi.mock("../hooks/api/useGenres", () => ({
  default: () => ({ data: [] }),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe("CreateBookForm", () => {
  test("renders trigger button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm />
      </QueryClientProvider>,
    );
    expect(screen.getByText("Add Book")).toBeInTheDocument();
  });

  test("opens dialog when button clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByText("Add Book"));
    expect(screen.getByText("Add New Book")).toBeInTheDocument();
  });

  test("shows form fields in dialog", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByText("Add Book"));
    expect(screen.getByTestId("create-book-title")).toBeInTheDocument();
    expect(screen.getByTestId("create-book-author")).toBeInTheDocument();
    expect(screen.getByTestId("create-book-genre")).toBeInTheDocument();
  });
});
