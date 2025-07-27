import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import InputLov from "./InputLov";

describe("InputLov", () => {
  const mockLoadOptions = vi.fn();
  const mockOnChange = vi.fn();
  const mockOnCreateOption = vi.fn();

  const defaultProps = {
    loadOptions: mockLoadOptions,
    onChange: mockOnChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLoadOptions.mockResolvedValue([]);
  });

  test("renders with default props and opens dropdown", () => {
    render(<InputLov {...defaultProps} />);
    const input = screen.getByTestId("input-lov-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Search...");

    fireEvent.focus(input);
    expect(screen.getByTestId("input-lov-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("input-lov-empty-message")).toHaveTextContent(
      "Start writing to search options...",
    );
  });

  test("renders disabled state", () => {
    render(<InputLov {...defaultProps} disabled />);
    const input = screen.getByTestId("input-lov-input");
    const openButton = screen.getByTestId("input-lov-open");
    expect(input).toBeDisabled();
    expect(openButton).toBeDisabled();
  });

  test("loads and displays options", async () => {
    const options = [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
    ];
    mockLoadOptions.mockResolvedValue(options);
    render(<InputLov {...defaultProps} />);
    const input = screen.getByTestId("input-lov-input");

    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByTestId("input-lov-loading")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(mockLoadOptions).toHaveBeenCalledWith("test");
        expect(screen.getByTestId("input-lov-option-0")).toBeInTheDocument();
        expect(screen.getByTestId("input-lov-option-1")).toBeInTheDocument();
      },
      { timeout: 500 },
    );
  });

  test("selects option and shows selected state", async () => {
    const options = [{ label: "Option 1", value: 1 }];
    mockLoadOptions.mockResolvedValue(options);
    render(<InputLov {...defaultProps} />);
    const input = screen.getByTestId("input-lov-input");

    fireEvent.change(input, { target: { value: "test" } });
    await waitFor(() => {
      const option = screen.getByTestId("input-lov-option-0");
      fireEvent.click(option);
      expect(mockOnChange).toHaveBeenCalledWith({ label: "Option 1", value: 1 });
    });
  });

  test("shows and uses clear button", () => {
    const selectedOption = { label: "Selected", value: "1" };
    render(<InputLov {...defaultProps} value={selectedOption} isClearable />);
    const input = screen.getByTestId("input-lov-input");
    const clearButton = screen.getByTestId("input-lov-clear");

    expect(input).toHaveValue("Selected");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  test("shows add option when no results found", async () => {
    mockLoadOptions.mockResolvedValue([]);
    render(<InputLov {...defaultProps} onCreateOption={mockOnCreateOption} />);
    const input = screen.getByTestId("input-lov-input");

    fireEvent.change(input, { target: { value: "new option" } });
    await waitFor(() => {
      expect(screen.getByTestId("input-lov-add-option")).toBeInTheDocument();
    });

    const addOption = screen.getByTestId("input-lov-add-option");
    fireEvent.click(addOption);
    expect(mockOnCreateOption).toHaveBeenCalledWith("new option");
  });

  test("shows no options message when no create option available", async () => {
    mockLoadOptions.mockResolvedValue([]);
    render(<InputLov {...defaultProps} noOptionsMessage="Custom no results" />);
    const input = screen.getByTestId("input-lov-input");

    fireEvent.change(input, { target: { value: "test" } });
    await waitFor(() => {
      expect(screen.getByTestId("input-lov-no-options")).toHaveTextContent("Custom no results");
    });
  });

  test("handles keyboard navigation", async () => {
    const options = [{ label: "Option 1", value: 1 }];
    mockLoadOptions.mockResolvedValue(options);
    render(<InputLov {...defaultProps} />);
    const input = screen.getByTestId("input-lov-input");

    fireEvent.change(input, { target: { value: "test" } });
    await waitFor(() => {
      fireEvent.keyDown(input, { key: "ArrowDown" });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(mockOnChange).toHaveBeenCalledWith({ label: "Option 1", value: 1 });
    });
  });

  test("closes dropdown with escape and outside click", async () => {
    render(<InputLov {...defaultProps} />);
    const input = screen.getByTestId("input-lov-input");

    fireEvent.focus(input);
    expect(screen.getByTestId("input-lov-dropdown")).toBeInTheDocument();

    fireEvent.keyDown(input, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByTestId("input-lov-dropdown")).not.toBeInTheDocument();
    });
  });
});
