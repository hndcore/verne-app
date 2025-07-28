import Header from "@/components/Header";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

describe("Header", () => {
  test("renders properly", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
