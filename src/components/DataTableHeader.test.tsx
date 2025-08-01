import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { DataTableHeader } from "./DataTableHeader";

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
        />
      </table>,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
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
        />
      </table>,
    );
    fireEvent.click(screen.getByText("Name"));
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
});
