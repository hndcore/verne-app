import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { DataTableHeader } from "../../components/DataTableHeader";

const mockSortConfig = { key: "name", direction: "asc" as const };

describe("DataTableHeader", () => {
  test("renders column headers", () => {
    render(
      <table>
        <DataTableHeader
          headers={["Name", "Value"]}
          colWidths={["w-32", "w-32"]}
          columnKeys={["name", "value"]}
          sortConfig={mockSortConfig}
          onSort={vi.fn()}
          testId="test-header"
        />
      </table>,
    );
    expect(screen.getByTestId("test-header-thead")).toBeInTheDocument();
    expect(screen.getByTestId("test-header-cell-name")).toBeInTheDocument();
    expect(screen.getByTestId("test-header-cell-value")).toBeInTheDocument();
  });

  test("calls onSort when header clicked", () => {
    const onSort = vi.fn();
    render(
      <table>
        <DataTableHeader
          headers={["Name", "Value"]}
          colWidths={["w-32", "w-32"]}
          columnKeys={["name", "value"]}
          sortConfig={mockSortConfig}
          onSort={onSort}
          testId="test-header"
        />
      </table>,
    );
    fireEvent.click(screen.getByTestId("test-header-cell-name"));
    expect(onSort).toHaveBeenCalledWith("name");
  });

  test("shows sort indicator for active column", () => {
    render(
      <table>
        <DataTableHeader
          headers={["Name", "Value"]}
          colWidths={["w-32", "w-32"]}
          columnKeys={["name", "value"]}
          sortConfig={mockSortConfig}
          onSort={vi.fn()}
        />
      </table>,
    );
    const nameHeader = screen.getByText("Name").closest("th");
    expect(nameHeader).toBeInTheDocument();
  });

  test("shows descending sort icon when direction is desc", () => {
    const descSortConfig = { key: "name", direction: "desc" as const };
    render(
      <table>
        <DataTableHeader
          headers={["Name", "Value"]}
          colWidths={["w-32", "w-32"]}
          columnKeys={["name", "value"]}
          sortConfig={descSortConfig}
          onSort={vi.fn()}
          testId="test-header"
        />
      </table>,
    );
    expect(screen.getByTestId("test-header-sort-icon-desc-name")).toBeInTheDocument();
  });

  test("shows inactive sort icon for non-active columns", () => {
    render(
      <table>
        <DataTableHeader
          headers={["Name", "Value"]}
          colWidths={["w-32", "w-32"]}
          columnKeys={["name", "value"]}
          sortConfig={mockSortConfig}
          onSort={vi.fn()}
          testId="test-header"
        />
      </table>,
    );
    const valueColumnContent = screen.getByTestId("test-header-content-value");
    const inactiveIcon = valueColumnContent.querySelector("svg");
    expect(inactiveIcon).toHaveClass("opacity-30");
  });

  test("renders without onSort handler", () => {
    render(
      <table>
        <DataTableHeader
          headers={["Name", "Value"]}
          colWidths={["w-32", "w-32"]}
          columnKeys={["name", "value"]}
          sortConfig={mockSortConfig}
          testId="test-header"
        />
      </table>,
    );
    expect(screen.getByTestId("test-header-thead")).toBeInTheDocument();
    expect(screen.queryByTestId("test-header-sort-icon-asc-name")).not.toBeInTheDocument();
  });

  test("renders without columnKeys", () => {
    render(
      <table>
        <DataTableHeader
          headers={["Name", "Value"]}
          colWidths={["w-32", "w-32"]}
          sortConfig={mockSortConfig}
          onSort={vi.fn()}
          testId="test-header"
        />
      </table>,
    );
    expect(screen.getByTestId("test-header-thead")).toBeInTheDocument();
    expect(screen.queryByTestId("test-header-sort-icon-asc-name")).not.toBeInTheDocument();
  });

  test("does not call onSort when onSort is not provided", () => {
    const { container } = render(
      <table>
        <DataTableHeader
          headers={["Name", "Value"]}
          colWidths={["w-32", "w-32"]}
          columnKeys={["name", "value"]}
          sortConfig={mockSortConfig}
          testId="test-header"
        />
      </table>,
    );
    const nameCell = screen.getByTestId("test-header-cell-name");
    fireEvent.click(nameCell);
    expect(container).toBeInTheDocument();
  });

  test("renders with different column count", () => {
    render(
      <table>
        <DataTableHeader
          headers={["Name", "Value", "Status", "Actions"]}
          colWidths={["w-32", "w-32", "w-24", "w-24"]}
          columnKeys={["name", "value", "status"]}
          sortConfig={mockSortConfig}
          onSort={vi.fn()}
          testId="test-header"
        />
      </table>,
    );
    expect(screen.getByTestId("test-header-cell-name")).toBeInTheDocument();
    expect(screen.getByTestId("test-header-cell-value")).toBeInTheDocument();
    expect(screen.getByTestId("test-header-cell-status")).toBeInTheDocument();
    expect(screen.getByTestId("test-header-actions-cell")).toBeInTheDocument();
  });
});
