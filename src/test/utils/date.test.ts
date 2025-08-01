import { formatDate } from "@/utils/date";
import { describe, test, expect } from "vitest";

describe("formatDate", () => {
  test("formats date correctly", () => {
    expect(formatDate("2025-07-28T16:26:01.914Z")).toBe("28-07-2025");
  });

  test("returns empty string for empty string input", () => {
    expect(formatDate("")).toBe("");
  });

  test("returns invalid date for random string", () => {
    expect(formatDate("asdf")).toBe("Invalid date");
  });
});
