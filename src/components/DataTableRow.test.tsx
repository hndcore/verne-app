import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { DataTableRow } from "./DataTableRow";

const mockItem = { id: "1", name: "Test Item", value: "Test Value" };

const mockColumns = [
  {
    key: "name",
    header: "Name",
    width: "w-32",
    renderDisplay: (value: string) => value,
    renderInput: () => <input readOnly />,
  },
];

describe("DataTableRow", () => {
  test("renders item data correctly", () => {
    render(
      <table>
        <tbody>
          <DataTableRow
            item={mockItem}
            columns={mockColumns}
            headers={["Name"]}
            activeIdEditing={null}
            onEdit={vi.fn()}
            onSave={vi.fn()}
            onCancel={vi.fn()}
            onDelete={vi.fn()}
          />
        </tbody>
      </table>,
    );
    expect(screen.getByTestId("data-table-row-1")).toBeInTheDocument();
  });

  test("calls onEdit when edit button clicked", () => {
    const onEdit = vi.fn();
    render(
      <table>
        <tbody>
          <DataTableRow
            item={mockItem}
            columns={mockColumns}
            headers={["Name"]}
            activeIdEditing={null}
            onEdit={onEdit}
            onSave={vi.fn()}
            onCancel={vi.fn()}
            onDelete={vi.fn()}
          />
        </tbody>
      </table>,
    );
    fireEvent.click(screen.getAllByTestId("edit-button")[1]);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  test("shows save/cancel buttons when editing", () => {
    render(
      <table>
        <tbody>
          <DataTableRow
            item={mockItem}
            columns={mockColumns}
            headers={["Name"]}
            activeIdEditing="1"
            onEdit={vi.fn()}
            onSave={vi.fn()}
            onCancel={vi.fn()}
            onDelete={vi.fn()}
          />
        </tbody>
      </table>,
    );
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});
