import * as Apis from "../../src/apis";

describe("Apis", () => {
  it("will have getItems func", () => {
    expect(typeof Apis.getItems).toBe("function");
  });
});
