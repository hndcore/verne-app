import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookTable from "../../features/books/components/BookTable";

vi.mock("../../features/books/hooks/api/useBooks", () => ({
  default: vi.fn(),
}));

vi.mock("../../features/books/hooks/api/useAuthors", () => ({
  default: vi.fn(),
}));

vi.mock("../../features/books/hooks/api/useGenres", () => ({
  default: vi.fn(),
}));

vi.mock("../../features/books/hooks/useBookForm", () => ({
  useBookForm: vi.fn(),
}));

vi.mock("../../features/books/hooks/api/useAuthorsMutation", () => ({
  useAuthorsMutation: vi.fn(),
}));

vi.mock("../../features/books/hooks/api/useGenresMutation", () => ({
  useGenresMutation: vi.fn(),
}));

vi.mock("../../features/books/store/tableStore", () => ({
  useTableStore: vi.fn(),
}));

vi.mock("use-debounce", () => ({
  useDebounce: vi.fn(),
}));

import useBooks from "../../features/books/hooks/api/useBooks";
import useAuthors from "../../features/books/hooks/api/useAuthors";
import useGenres from "../../features/books/hooks/api/useGenres";
import { useBookForm } from "../../features/books/hooks/useBookForm";
import { useAuthorsMutation } from "../../features/books/hooks/api/useAuthorsMutation";
import { useGenresMutation } from "../../features/books/hooks/api/useGenresMutation";
import { useTableStore } from "../../features/books/store/tableStore";
import { useDebounce } from "use-debounce";

const mockBooks = [
  {
    id: "1",
    title: "Test Book 1",
    authorId: "1",
    author: { id: "1", name: "Test Author 1" },
    genreId: "1",
    genre: { id: "1", name: "Fiction" },
    status: "reading",
    rating: 4,
    dateAdded: "2023-01-01",
  },
  {
    id: "2",
    title: "Test Book 2",
    authorId: "2",
    author: { id: "2", name: "Test Author 2" },
    genreId: "2",
    genre: { id: "2", name: "Non-Fiction" },
    status: "completed",
    rating: 5,
    dateAdded: "2023-01-02",
  },
];

const mockAuthors = [
  { id: "1", name: "Test Author 1" },
  { id: "2", name: "Test Author 2" },
];

const mockGenres = [
  { id: "1", name: "Fiction" },
  { id: "2", name: "Non-Fiction" },
];

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};

describe("BookTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useBooks as any).mockReturnValue({
      data: mockBooks,
      isLoading: false,
      isError: false,
    });

    (useAuthors as any).mockReturnValue({
      data: mockAuthors,
    });

    (useGenres as any).mockReturnValue({
      data: mockGenres,
    });

    (useBookForm as any).mockReturnValue({
      editingId: null,
      isCreateDialogOpen: false,
      isDeleteDialogOpen: false,
      bookToDelete: null,
      setEditingId: vi.fn(),
      setIsCreateDialogOpen: vi.fn(),
      setIsDeleteDialogOpen: vi.fn(),
      setBookToDelete: vi.fn(),
      handleEdit: vi.fn(),
      handleSave: vi.fn(),
      handleCancel: vi.fn(),
      handleDelete: vi.fn(),
      handleView: vi.fn(),
      handleCreateBook: vi.fn(),
      handleDeleteBook: vi.fn(),
      control: {} as any,
      formState: { errors: {} },
      handleSubmit: vi.fn(),
      reset: vi.fn(),
    });

    (useAuthorsMutation as any).mockReturnValue({
      createAuthor: vi.fn(),
    });

    (useGenresMutation as any).mockReturnValue({
      createGenre: vi.fn(),
    });

    (useTableStore as any).mockReturnValue({
      searchTerm: "",
      currentPage: 1,
      pageSize: 10,
      sortConfig: { key: "title", direction: "asc" },
      setCurrentPage: vi.fn(),
      setTotalItems: vi.fn(),
      toggleSort: vi.fn(),
      setSearchTerm: vi.fn(),
    });

    (useDebounce as any).mockReturnValue([""]);
  });

  test("renders loading state", () => {
    (useBooks as any).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    renderWithQueryClient(<BookTable />);
    expect(screen.getByTestId("book-table-data-loading")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useBooks as any).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    renderWithQueryClient(<BookTable />);
    expect(screen.getByText("Error loading books")).toBeInTheDocument();
  });

  test("shows books data when loaded", () => {
    renderWithQueryClient(<BookTable />);
    expect(screen.getByTestId("book-table-data-container")).toBeInTheDocument();
  });

  test("updates search term when typing", async () => {
    const setSearchTerm = vi.fn();
    (useTableStore as any).mockReturnValue({
      searchTerm: "",
      currentPage: 1,
      pageSize: 10,
      sortConfig: { key: "title", direction: "asc" },
      setCurrentPage: vi.fn(),
      setTotalItems: vi.fn(),
      toggleSort: vi.fn(),
      setSearchTerm,
    });

    renderWithQueryClient(<BookTable />);
    const searchInput = screen.getByTestId("book-table-search-input");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    await waitFor(() => {
      expect(setSearchTerm).toHaveBeenCalledWith("test search");
    });
  });

  test("calls sort function when column is clicked", () => {
    const toggleSort = vi.fn();
    (useTableStore as any).mockReturnValue({
      searchTerm: "",
      currentPage: 1,
      pageSize: 10,
      sortConfig: { key: "title", direction: "asc" },
      setCurrentPage: vi.fn(),
      setTotalItems: vi.fn(),
      toggleSort,
      setSearchTerm: vi.fn(),
    });

    renderWithQueryClient(<BookTable />);
    const titleHeader = screen.getByTestId("book-table-data-header-cell-title");
    fireEvent.click(titleHeader);
    expect(toggleSort).toHaveBeenCalledWith("title");
  });

  test("shows empty state when no books", () => {
    (useBooks as any).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    renderWithQueryClient(<BookTable />);
    expect(screen.getByTestId("book-table-data-empty-message")).toBeInTheDocument();
  });

  test("filters books when searching", () => {
    (useDebounce as any).mockReturnValue(["Test Book 1", false]);

    renderWithQueryClient(<BookTable />);
    expect(screen.getByTestId("book-table-data-container")).toBeInTheDocument();
  });
});
