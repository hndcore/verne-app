import Home from "@/pages/home";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

describe("Home", () => {
  test("renders properly", () => {
    render(<Home />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("home-main")).toBeInTheDocument();
  });
});
