import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Button, { type ButtonSize, type ButtonVariant } from "./Button";

describe("Button", () => {
  test("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
  });

  test("renders with custom testId", () => {
    render(<Button testId="custom-button">Test</Button>);
    const button = screen.getByTestId("custom-button");
    expect(button).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    );
    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  test("does not call onClick when loading", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} loading>
        Click me
      </Button>,
    );
    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  test("renders all button variants", () => {
    const variants = ["primary", "secondary", "outline", "ghost", "danger", "success"];
    variants.forEach(variant => {
      const { unmount } = render(
        <Button variant={variant as ButtonVariant} testId={`button-${variant}`}>
          Test
        </Button>,
      );
      const button = screen.getByTestId(`button-${variant}`);
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  test("renders all button sizes", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"];
    sizes.forEach(size => {
      const { unmount } = render(
        <Button size={size as ButtonSize} testId={`button-${size}`}>
          Test
        </Button>,
      );
      const button = screen.getByTestId(`button-${size}`);
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  test("renders loading spinner when loading", () => {
    render(<Button loading>Loading</Button>);
    const spinner = screen.getByRole("button").querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  test("renders icon on the left by default", () => {
    const icon = <span data-testid="icon">🔥</span>;
    render(<Button icon={icon}>With Icon</Button>);
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.parentElement).toHaveClass("mr-2");
  });

  test("renders icon on the right when iconPosition is right", () => {
    const icon = <span data-testid="icon">🔥</span>;
    render(
      <Button icon={icon} iconPosition="right">
        With Icon
      </Button>,
    );
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.parentElement).toHaveClass("ml-2");
  });

  test("does not render icon when loading", () => {
    const icon = <span data-testid="icon">🔥</span>;
    render(
      <Button icon={icon} loading>
        Loading
      </Button>,
    );
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByTestId("button");
    expect(button).toHaveClass("custom-class");
  });

  test("has correct accessibility attributes", () => {
    render(<Button>Accessible Button</Button>);
    const button = screen.getByTestId("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-2",
      "focus:ring-amber-500",
    );
  });

  test("applies disabled styles when disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByTestId("button");
    expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
    expect(button).toBeDisabled();
  });

  test("applies disabled styles when loading", () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByTestId("button");
    expect(button).toHaveClass("opacity-50", "cursor-not-allowed");
    expect(button).toBeDisabled();
  });
});
