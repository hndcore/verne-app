import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DeleteBookDialog from "../../features/books/components/DeleteBookDialog";

describe("DeleteBookDialog", () => {
  test("renders when open", () => {
    render(
      <DeleteBookDialog
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
        bookTitle="Test Book"
      />,
    );
    expect(screen.getByText("Delete Book")).toBeInTheDocument();
    expect(screen.getByText(/Test Book/)).toBeInTheDocument();
  });

  test("calls onClose when cancel clicked", () => {
    const onClose = vi.fn();
    render(
      <DeleteBookDialog
        isOpen={true}
        onClose={onClose}
        onConfirm={vi.fn()}
        bookTitle="Test Book"
      />,
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onConfirm when delete clicked", () => {
    const onConfirm = vi.fn();
    render(
      <DeleteBookDialog
        isOpen={true}
        onClose={vi.fn()}
        onConfirm={onConfirm}
        bookTitle="Test Book"
      />,
    );
    fireEvent.click(screen.getByText("Delete"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
