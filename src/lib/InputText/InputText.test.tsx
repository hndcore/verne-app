import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import InputText, { type InputTextSize, type InputTextType } from "./InputText";

describe("InputText", () => {
  test("renders with default props and handles value change", () => {
    const onChange = vi.fn();
    render(<InputText onChange={onChange} />);

    const input = screen.getByTestId("input-input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).not.toBeDisabled();
    expect(input).not.toHaveAttribute("readonly");

    fireEvent.change(input, { target: { value: "test value" } });
    expect(onChange).toHaveBeenCalledWith("test value");
  });

  test("renders with all props and custom events", () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onKeyDown = vi.fn();

    render(
      <InputText
        value="initial value"
        placeholder="Enter text"
        size="lg"
        type="email"
        className="custom-class"
        testId="custom"
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />,
    );

    const input = screen.getByTestId("custom-input");
    expect(input).toHaveValue("initial value");
    expect(input).toHaveAttribute("placeholder", "Enter text");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveClass("custom-class");

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();

    fireEvent.keyDown(input, { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalled();
  });

  test("handles disabled and readonly states", () => {
    const onChange = vi.fn();
    const { rerender } = render(<InputText disabled={true} onChange={onChange} />);

    let input = screen.getByTestId("input-input");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("bg-gray-100", "cursor-not-allowed", "opacity-50");

    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).not.toHaveBeenCalled();

    rerender(<InputText readOnly onChange={onChange} />);
    input = screen.getByTestId("input-input");
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveClass("bg-gray-50", "cursor-default");
  });

  test("renders all sizes and input types", () => {
    const sizes = ["sm", "md", "lg"];
    const types = ["text", "email", "password", "number", "tel", "url"];

    sizes.forEach(size => {
      const { unmount } = render(
        <InputText size={size as InputTextSize} testId={`input-${size}`} />,
      );
      const input = screen.getByTestId(`input-${size}-input`);
      expect(input).toBeInTheDocument();
      unmount();
    });

    types.forEach(type => {
      const { unmount } = render(
        <InputText type={type as InputTextType} testId={`input-${type}`} />,
      );
      const input = screen.getByTestId(`input-${type}-input`);
      expect(input).toHaveAttribute("type", type);
      unmount();
    });
  });
});
