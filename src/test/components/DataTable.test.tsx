import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DataTable from "../../components/DataTable";

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

  test("should call onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        isLoading={false}
        isError={false}
        headers={["Name", "Value"]}
        colWidths={["w-32", "w-32"]}
        onEdit={onEdit}
        onSave={vi.fn()}
        onCancel={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={mockSortConfig}
      />,
    );
    const editButton = screen.getAllByTestId("edit-button")[1];
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith("1");
  });

  test("should call onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
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
        onDelete={onDelete}
        sortConfig={mockSortConfig}
      />,
    );
    const deleteButton = screen.getAllByTestId("delete-button")[1];
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  test("should call onSave when save button is clicked", () => {
    const onSave = vi.fn();
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        isLoading={false}
        isError={false}
        headers={["Name", "Value"]}
        colWidths={["w-32", "w-32"]}
        activeIdEditing="1"
        onEdit={vi.fn()}
        onSave={onSave}
        onCancel={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={mockSortConfig}
      />,
    );
    const saveButton = screen.getAllByTestId("save-button")[1];
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledWith("1");
  });

  test("should call onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        isLoading={false}
        isError={false}
        headers={["Name", "Value"]}
        colWidths={["w-32", "w-32"]}
        activeIdEditing="1"
        onEdit={vi.fn()}
        onSave={vi.fn()}
        onCancel={onCancel}
        onDelete={vi.fn()}
        sortConfig={mockSortConfig}
      />,
    );
    const cancelButton = screen.getAllByTestId("cancel-button")[1];
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledWith("1");
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
