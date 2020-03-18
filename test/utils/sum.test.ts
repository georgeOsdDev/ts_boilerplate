import { sum } from "../../src/utils/sum";

describe("sum", () => {
  it("will return sum of arguments", () => {
    expect(sum(0)).toBe(0);
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2, 3)).toBe(6);
  });
});
