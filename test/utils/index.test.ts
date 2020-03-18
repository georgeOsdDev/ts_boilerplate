import * as Utils from "../../src/utils";

describe("Utils", () => {
  it("will have sum func", () => {
    expect(typeof Utils.sum).toBe("function");
  });
});
