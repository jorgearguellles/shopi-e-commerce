import { describe, expect, test } from "vitest";
import { sum } from "../../utils/sum";

describe("sum function", () => {
  test("adds two positive numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("adds a positive and a negative number", () => {
    expect(sum(5, -2)).toBe(3);
  });

  test("adds two negative numbers", () => {
    expect(sum(-4, -6)).toBe(-10);
  });

  test("adds zero to a number", () => {
    expect(sum(7, 0)).toBe(7);
  });
});
