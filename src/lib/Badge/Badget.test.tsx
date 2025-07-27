import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Badge, { type BadgeSize, type BadgeVariant } from "./Badge";

describe("Badge", () => {
  test("renders with default props", () => {
    render(<Badge>Badge text</Badge>);
    const badge = screen.getByText("Badge text");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Badge text");
    expect(badge.tagName).toBe("SPAN");
  });

  test("renders with custom testId", () => {
    render(<Badge testId="custom-badge">Test</Badge>);
    const badge = screen.getByTestId("custom-badge");
    expect(badge).toBeInTheDocument();
  });

  test("renders all badge variants", () => {
    const variants = ["primary", "secondary", "outline", "ghost", "danger", "success"];
    variants.forEach(variant => {
      const { unmount } = render(<Badge variant={variant as BadgeVariant}>Test</Badge>);
      const badge = screen.getByText("Test");
      expect(badge).toBeInTheDocument();
      unmount();
    });
  });

  test("renders all badge sizes", () => {
    const sizes = ["sm", "lg"];
    sizes.forEach(size => {
      const { unmount } = render(<Badge size={size as BadgeSize}>Test</Badge>);
      const badge = screen.getByText("Test");
      expect(badge).toBeInTheDocument();
      unmount();
    });
  });

  test("renders icon on the left by default", () => {
    const icon = <span data-testid="icon">🔥</span>;
    render(<Badge icon={icon}>With Icon</Badge>);
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.parentElement).toHaveClass("mr-1");
  });

  test("renders icon on the right when iconPosition is right", () => {
    const icon = <span data-testid="icon">🔥</span>;
    render(
      <Badge icon={icon} iconPosition="right">
        With Icon
      </Badge>,
    );
    const iconElement = screen.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.parentElement).toHaveClass("ml-1");
  });

  test("applies custom className", () => {
    render(<Badge className="custom-class">Test</Badge>);
    const badge = screen.getByText("Test");
    expect(badge).toHaveClass("custom-class");
  });

  test("has correct base styling classes", () => {
    render(<Badge>Styled Badge</Badge>);
    const badge = screen.getByText("Styled Badge");
    expect(badge).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
      "font-medium",
      "rounded-full",
    );
  });

  test("applies primary variant styles by default", () => {
    render(<Badge>Primary Badge</Badge>);
    const badge = screen.getByText("Primary Badge");
    expect(badge).toHaveClass("bg-amber-900", "text-amber-50");
  });

  test("applies secondary variant styles", () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText("Secondary Badge");
    expect(badge).toHaveClass("bg-[#e6dbcb]", "text-amber-900");
  });

  test("applies outline variant styles", () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    const badge = screen.getByText("Outline Badge");
    expect(badge).toHaveClass("bg-transparent", "text-amber-900", "border", "border-amber-300");
  });

  test("applies ghost variant styles", () => {
    render(<Badge variant="ghost">Ghost Badge</Badge>);
    const badge = screen.getByText("Ghost Badge");
    expect(badge).toHaveClass("bg-amber-100", "text-amber-800");
  });

  test("applies danger variant styles", () => {
    render(<Badge variant="danger">Danger Badge</Badge>);
    const badge = screen.getByText("Danger Badge");
    expect(badge).toHaveClass("bg-red-800", "text-red-50");
  });

  test("applies success variant styles", () => {
    render(<Badge variant="success">Success Badge</Badge>);
    const badge = screen.getByText("Success Badge");
    expect(badge).toHaveClass("bg-emerald-800", "text-emerald-50");
  });

  test("applies small size styles by default", () => {
    render(<Badge>Small Badge</Badge>);
    const badge = screen.getByText("Small Badge");
    expect(badge).toHaveClass("px-2.5", "py-1", "text-xs");
  });

  test("applies large size styles", () => {
    render(<Badge size="lg">Large Badge</Badge>);
    const badge = screen.getByText("Large Badge");
    expect(badge).toHaveClass("px-3.5", "py-1.5", "text-sm");
  });

  test("renders without icon when no icon provided", () => {
    render(<Badge>No Icon Badge</Badge>);
    const badge = screen.getByText("No Icon Badge");
    expect(badge.querySelector("[data-testid='icon']")).not.toBeInTheDocument();
  });

  test("renders with both icon and text content", () => {
    const icon = <span data-testid="icon">⭐</span>;
    render(<Badge icon={icon}>Badge with icon</Badge>);
    const badge = screen.getByText("Badge with icon");
    const iconElement = screen.getByTestId("icon");
    expect(badge).toHaveTextContent("Badge with icon");
    expect(iconElement).toBeInTheDocument();
  });
});
