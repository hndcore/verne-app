import Pagination from "@/components/Pagination";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

describe("Pagination", () => {
  test("renders correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
        pageSize={10}
        totalItems={15}
      />,
    );
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });
  test("displays without items", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        pageSize={10}
        totalItems={1}
      />,
    );
    expect(screen.queryByTestId("pagination")).toBeNull();
  });
  test("renders on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={() => {}}
        pageSize={10}
        totalItems={50}
      />,
    );
    expect(screen.getByText("41-50 of 50")).toBeInTheDocument();
  });
  test("calls onPageChange when next page button is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
        pageSize={10}
        totalItems={30}
      />,
    );
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange when previous page button is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChange}
        pageSize={10}
        totalItems={30}
      />,
    );
    const previousButton = screen.getByTestId("previous-button");
    expect(previousButton).toBeInTheDocument();
    fireEvent.click(previousButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange when first page button is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChange}
        pageSize={10}
        totalItems={30}
      />,
    );
    const firstButton = screen.getByTestId("first-button");
    expect(firstButton).toBeInTheDocument();
    fireEvent.click(firstButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test("calls onPageChange when last page button is clicked", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChange}
        pageSize={10}
        totalItems={30}
      />,
    );
    const lastButton = screen.getByTestId("last-button");
    expect(lastButton).toBeInTheDocument();
    fireEvent.click(lastButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
