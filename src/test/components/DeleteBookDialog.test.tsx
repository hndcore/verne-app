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
        testId="test-dialog"
      />,
    );
    expect(screen.getByTestId("test-dialog-title")).toBeInTheDocument();
    expect(screen.getByTestId("test-dialog-book-title")).toBeInTheDocument();
  });

  test("calls onClose when cancel clicked", () => {
    const onClose = vi.fn();
    render(
      <DeleteBookDialog
        isOpen={true}
        onClose={onClose}
        onConfirm={vi.fn()}
        bookTitle="Test Book"
        testId="test-dialog"
      />,
    );
    fireEvent.click(screen.getByTestId("test-dialog-cancel-button"));
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
        testId="test-dialog"
      />,
    );
    fireEvent.click(screen.getByTestId("test-dialog-confirm-button"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
