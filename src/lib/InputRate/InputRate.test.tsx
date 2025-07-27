import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import InputRate, { type InputRateSize } from "./InputRate";

describe("InputRate", () => {
  test("renders readonly mode with default props and value", () => {
    render(<InputRate value={3} />);

    const readonly = screen.getByTestId("rating-readonly");
    expect(readonly).toBeInTheDocument();
    expect(readonly).toHaveAttribute("role", "img");
    expect(readonly).toHaveAttribute("aria-label", "Rating: 3 of 5 stars");
    expect(screen.getByTestId("rating-star-1")).toBeInTheDocument();
    expect(screen.getByTestId("rating-star-5")).toBeInTheDocument();
  });

  test("renders editable mode with all props and handles change", () => {
    const onChange = vi.fn();
    render(
      <InputRate
        value={2}
        editable
        size="lg"
        className="custom-class"
        testId="custom"
        label="Custom Rating"
        onChange={onChange}
      />,
    );

    const editable = screen.getByTestId("custom-editable");
    expect(editable).toBeInTheDocument();
    expect(editable).toHaveClass("custom-class");
    expect(editable).not.toBeDisabled();
    const option3 = screen.getByTestId("custom-option-3");
    const input3 = screen.getByTestId("custom-input-3");
    expect(input3).toHaveAttribute("name", "custom-rating");
    expect(input3).toHaveAttribute("value", "3");
    fireEvent.click(option3);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  test("handles disabled state and value normalization", () => {
    const onChange = vi.fn();
    render(<InputRate value={7.8} editable disabled onChange={onChange} />);

    const editable = screen.getByTestId("rating-editable");
    expect(editable).toBeDisabled();

    const input5 = screen.getByTestId("rating-input-5");
    expect(input5).toBeChecked();
    expect(input5).toBeDisabled();

    const option4 = screen.getByTestId("rating-option-4");
    fireEvent.click(option4);
    expect(onChange).not.toHaveBeenCalled();
  });

  test("renders all sizes", () => {
    const sizes = ["sm", "md", "lg"];
    sizes.forEach(size => {
      const { unmount } = render(
        <InputRate size={size as InputRateSize} testId={`rating-${size}`} />,
      );
      const readonly = screen.getByTestId(`rating-${size}-readonly`);
      expect(readonly).toBeInTheDocument();
      unmount();
    });
  });
});
