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
  test("shows table data when provided", () => {
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
        testId="test-table"
      />,
    );
    expect(screen.getByTestId("test-table-container")).toBeInTheDocument();
    expect(screen.getAllByTestId("test-table-row-1")[0]).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", () => {
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
        testId="test-table"
      />,
    );
    const editButton = screen.getAllByTestId("test-table-row-edit-button-1")[0];
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith("1");
  });

  test("calls onDelete when delete button is clicked", () => {
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
        testId="test-table"
      />,
    );
    const deleteButton = screen.getAllByTestId("test-table-row-delete-button-1")[0];
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  test("calls onSave when save button is clicked", () => {
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
        testId="test-table"
      />,
    );
    const saveButton = screen.getAllByTestId("test-table-row-save-button-1")[0];
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledWith("1");
  });

  test("calls onCancel when cancel button is clicked", () => {
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
        testId="test-table"
      />,
    );
    const cancelButton = screen.getAllByTestId("test-table-row-cancel-button-1")[0];
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
        testId="data-table"
      />,
    );
    expect(screen.getByTestId("data-table-error")).toBeInTheDocument();
  });

  test("shows empty message when no data", () => {
    render(
      <DataTable
        data={[]}
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
        testId="data-table"
      />,
    );
    expect(screen.getByTestId("data-table-empty-message")).toBeInTheDocument();
  });

  test("sorts data with descending direction", () => {
    const descSortConfig = { key: "value", direction: "desc" as const };
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
        sortConfig={descSortConfig}
        testId="test-table"
      />,
    );
    expect(screen.getByTestId("test-table-container")).toBeInTheDocument();
  });

  test("shows edit buttons when not editing", () => {
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
        testId="test-table"
      />,
    );
    expect(screen.getAllByTestId("test-table-row-edit-button-1")[0]).toBeInTheDocument();
  });

  test("calls sort handler when provided", () => {
    const onSort = vi.fn();
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
        onSort={onSort}
        sortConfig={mockSortConfig}
        testId="test-table"
      />,
    );
    const headerCell = screen.getByTestId("test-table-header-cell-name");
    fireEvent.click(headerCell);
    expect(onSort).toHaveBeenCalledWith("name");
  });

  test("shows pagination when provided", () => {
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
        currentPage={1}
        totalPages={5}
        totalItems={50}
        pageSize={10}
        onPageChange={vi.fn()}
        testId="test-table"
      />,
    );
    expect(screen.getByTestId("test-table-pagination-container")).toBeInTheDocument();
  });

  test("calls onView when view handler provided", () => {
    const onView = vi.fn();
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
        onView={onView}
        sortConfig={mockSortConfig}
        testId="test-table"
      />,
    );
    const viewButton = screen.getAllByTestId("test-table-row-view-button-1")[0];
    fireEvent.click(viewButton);
    expect(onView).toHaveBeenCalledWith("1");
  });

  test("renders custom empty message", () => {
    render(
      <DataTable
        data={[]}
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
        emptyMessage="Custom empty message"
        testId="data-table"
      />,
    );
    expect(screen.getByTestId("data-table-empty-message")).toBeInTheDocument();
    expect(screen.getByTestId("data-table-empty-message")).toHaveTextContent(
      "Custom empty message",
    );
  });
});
