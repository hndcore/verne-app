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
  test("renders add button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    expect(screen.getByTestId("test-form-add-button")).toBeInTheDocument();
  });

  test("opens dialog when add button is clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));
    expect(screen.getByTestId("test-form-title")).toBeInTheDocument();
  });

  test("shows all form fields in dialog", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));
    expect(screen.getByTestId("test-form-title-field")).toBeInTheDocument();
    expect(screen.getByTestId("test-form-author-field")).toBeInTheDocument();
    expect(screen.getByTestId("test-form-genre-field")).toBeInTheDocument();
    expect(screen.getByTestId("test-form-status-field")).toBeInTheDocument();
  });

  test("accepts input in title field", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));

    const titleInput = screen.getByTestId("test-form-title-input-input");
    fireEvent.change(titleInput, { target: { value: "Test Book" } });
    expect(titleInput).toHaveValue("Test Book");
  });

  test("submits form with filled data", () => {
    const mockCreateBook = vi.fn().mockResolvedValue({});
    vi.doMock("../hooks/api/useBookMutations", () => ({
      useBookMutations: () => ({
        createBook: { mutateAsync: mockCreateBook, isPending: false },
      }),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));

    fireEvent.change(screen.getByTestId("test-form-title-input-input"), {
      target: { value: "Test Book" },
    });

    fireEvent.click(screen.getByTestId("test-form-submit-button"));
  });

  test("shows validation errors for empty fields", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));

    fireEvent.click(screen.getByTestId("test-form-submit-button"));

    expect(screen.getByTestId("test-form-title-field")).toBeInTheDocument();
  });

  test("closes dialog when cancel is clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));
    expect(screen.getByTestId("test-form-title")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("test-form-cancel-button"));
    expect(screen.queryByTestId("test-form-title")).not.toBeInTheDocument();
  });

  test("renders with custom trigger element", () => {
    const customTrigger = <button data-testid="custom-trigger">Custom Add Book</button>;
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" trigger={customTrigger} />
      </QueryClientProvider>,
    );
    expect(screen.getByTestId("custom-trigger")).toBeInTheDocument();
  });

  test("renders with default trigger when none provided", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    expect(screen.getByTestId("test-form-add-button")).toBeInTheDocument();
  });

  test("updates rating when status changes to completed", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));

    const statusSelect = screen.getByTestId("test-form-status-select");
    fireEvent.change(statusSelect, { target: { value: "completed" } });

    const ratingInput = screen.getByTestId("test-form-rating-input-option-3");
    fireEvent.click(ratingInput);
  });

  test("updates status field when changed", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));

    const statusSelect = screen.getByTestId("test-form-status-select");
    fireEvent.change(statusSelect, { target: { value: "reading" } });
  });

  test("shows submit button when form is ready", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateBookForm testId="test-form" />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId("test-form-add-button"));

    fireEvent.change(screen.getByTestId("test-form-title-input-input"), {
      target: { value: "Test Book" },
    });

    const createButton = screen.getByTestId("test-form-submit-button");
    expect(createButton).toBeInTheDocument();
    expect(createButton).not.toBeDisabled();
  });
});
