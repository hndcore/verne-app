import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DetailedBookDialog from "./DetailedBookDialog";
import type { BookExtended } from "../types/book";

const mockBook: BookExtended = {
  id: "1",
  title: "Test Book",
  authorId: "author1",
  genreId: "genre1",
  status: "completed",
  rating: 4,
  dateAdded: "2024-01-01",
  author: { id: "author1", name: "Test Author" },
  genre: { id: "genre1", name: "Fiction" },
};

describe("DetailedBookDialog", () => {
  test("renders when open", () => {
    render(<DetailedBookDialog book={mockBook} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Book Details")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Book")).toBeInTheDocument();
  });

  test("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(<DetailedBookDialog book={mockBook} isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId("close-button-detail"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("displays book information correctly", () => {
    render(<DetailedBookDialog book={mockBook} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByDisplayValue("Test Author")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Fiction")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});
