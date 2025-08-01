import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DetailedBookDialog from "../../features/books/components/DetailedBookDialog";
import type { BookExtended, BookStatus } from "../../features/books/types/book";

const mockBook: BookExtended = {
  id: "1",
  title: "Test Book",
  authorId: "author1",
  genreId: "genre1",
  status: "completed" as BookStatus,
  rating: 4,
  dateAdded: "2024-01-01",
  author: {
    id: "author1",
    name: "Test Author",
  },
  genre: {
    id: "genre1",
    name: "Fiction",
  },
};

describe("DetailedBookDialog", () => {
  test("does not render when closed", () => {
    render(
      <DetailedBookDialog book={mockBook} isOpen={false} onClose={vi.fn()} testId="test-dialog" />,
    );
    expect(screen.queryByTestId("test-dialog")).not.toBeInTheDocument();
  });

  test("renders book information when open", () => {
    render(
      <DetailedBookDialog book={mockBook} isOpen={true} onClose={vi.fn()} testId="test-dialog" />,
    );
    expect(screen.getByTestId("test-dialog-author-input-input")).toBeInTheDocument();
    expect(screen.getByTestId("test-dialog-genre-input-input")).toBeInTheDocument();
    const badge = screen.getByTestId("test-dialog-status-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-emerald-800");
    expect(screen.getByTestId("test-dialog-rating-input-readonly")).toBeInTheDocument();
  });

  test("renders book without rating", () => {
    const bookWithoutRating = { ...mockBook, rating: null };
    render(
      <DetailedBookDialog
        book={bookWithoutRating}
        isOpen={true}
        onClose={vi.fn()}
        testId="test-dialog"
      />,
    );
    expect(screen.getByTestId("test-dialog-title")).toBeInTheDocument();
    expect(screen.getByTestId("test-dialog-title-input-input")).toBeInTheDocument();
  });

  test("shows reading status with blue background", () => {
    const readingBook = { ...mockBook, status: "reading" as BookStatus };
    render(
      <DetailedBookDialog
        book={readingBook}
        isOpen={true}
        onClose={vi.fn()}
        testId="test-dialog"
      />,
    );
    const badge = screen.getByTestId("test-dialog-status-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-amber-900");
  });

  test("shows not started status with gray background", () => {
    const notStartedBook = { ...mockBook, status: "not_started" as BookStatus };
    render(
      <DetailedBookDialog
        book={notStartedBook}
        isOpen={true}
        onClose={vi.fn()}
        testId="test-dialog"
      />,
    );
    const badge = screen.getByTestId("test-dialog-status-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-[#e6dbcb]");
  });

  test("renders book with maximum rating", () => {
    const maxRatingBook = { ...mockBook, rating: 5 };
    render(
      <DetailedBookDialog
        book={maxRatingBook}
        isOpen={true}
        onClose={vi.fn()}
        testId="test-dialog"
      />,
    );
    expect(screen.getByTestId("test-dialog-rating-input-readonly")).toBeInTheDocument();
  });

  test("renders book with minimum rating", () => {
    const minRatingBook = { ...mockBook, rating: 1 };
    render(
      <DetailedBookDialog
        book={minRatingBook}
        isOpen={true}
        onClose={vi.fn()}
        testId="test-dialog"
      />,
    );
    expect(screen.getByTestId("test-dialog-rating-input-readonly")).toBeInTheDocument();
  });

  test("shows on hold status with transparent background", () => {
    const onHoldBook = { ...mockBook, status: "on_hold" as BookStatus };
    render(
      <DetailedBookDialog book={onHoldBook} isOpen={true} onClose={vi.fn()} testId="test-dialog" />,
    );
    const badge = screen.getByTestId("test-dialog-status-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-transparent");
  });

  test("shows dropped status with red background", () => {
    const droppedBook = { ...mockBook, status: "dropped" as BookStatus };
    render(
      <DetailedBookDialog
        book={droppedBook}
        isOpen={true}
        onClose={vi.fn()}
        testId="test-dialog"
      />,
    );
    const badge = screen.getByTestId("test-dialog-status-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-800");
  });

  test("renders book with unknown status", () => {
    const unknownBook = { ...mockBook, status: "unknown" as BookStatus };
    render(
      <DetailedBookDialog
        book={unknownBook}
        isOpen={true}
        onClose={vi.fn()}
        testId="test-dialog"
      />,
    );
    expect(screen.getByTestId("test-dialog-status-badge")).toBeInTheDocument();
  });
});
