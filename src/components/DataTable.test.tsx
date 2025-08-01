import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DataTable from "./DataTable";

const mockData = [
  { id: "1", name: "Item 1", value: "Value 1" },
  { id: "2", name: "Item 2", value: "Value 2" },
];

const mockColumns = [
  {
    key: "name",
    header: "Name",
    width: "w-32",
    renderDisplay: (value: string) => value,
    renderInput: () => <input readOnly />,
  },
  {
    key: "value",
    header: "Value",
    width: "w-32",
    renderDisplay: (value: string) => value,
    renderInput: () => <input readOnly />,
  },
];

const mockSortConfig = { key: "name", direction: "asc" as const };

describe("DataTable", () => {
  test("renders data correctly", () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        isLoading={false}
        isError={false}
        headers={["Name", "Value"]}
        colWidths={["w-32", "w-32"]}
        onEdit={vi.fn()}
        onSave={vi.fn()}
        onCancel={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={mockSortConfig}
      />,
    );
    expect(screen.getAllByTestId("data-table-row-1")).not.toBeNull();
  });

  test("shows loading state", () => {
    render(
      <DataTable
        data={[]}
        columns={mockColumns}
        isLoading={true}
        isError={false}
        headers={["Name", "Value"]}
        colWidths={["w-32", "w-32"]}
        testId="data-table"
        onEdit={vi.fn()}
        onSave={vi.fn()}
        onCancel={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={mockSortConfig}
      />,
    );
    expect(screen.getByTestId("data-table-loading")).toBeInTheDocument();
  });

  test("shows error state", () => {
    render(
      <DataTable
        data={[]}
        columns={mockColumns}
        isLoading={false}
        isError={true}
        headers={["Name", "Value"]}
        colWidths={["w-32", "w-32"]}
        onEdit={vi.fn()}
        onSave={vi.fn()}
        onCancel={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={mockSortConfig}
      />,
    );
    expect(screen.getByText("Error loading data")).toBeInTheDocument();
  });
});
