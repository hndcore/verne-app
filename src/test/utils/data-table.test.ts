import { getVisiblePages } from "@/utils/data-table";
import { describe, test, expect } from "vitest";

describe("getVisiblePages", () => {
  test("returns correct visible pages with 2 pages", () => {
    const result = getVisiblePages(1, 2);
    expect(result).toEqual([1, 2]);
  });
  test("returns single page when total pages is 1", () => {
    const result = getVisiblePages(1, 1);
    expect(result).toEqual([1]);
  });

  test("returns correct visible pages with more than 3 pages", () => {
    const result = getVisiblePages(1, 5);
    expect(result).toEqual([1, 2, 3, "...", 5]);
  });
});
