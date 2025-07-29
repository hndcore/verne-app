import Home from "@/pages/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

describe("Home", () => {
  test("renders properly", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>,
    );
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("home-main")).toBeInTheDocument();
  });
});
