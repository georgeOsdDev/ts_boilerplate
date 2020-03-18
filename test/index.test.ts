jest.mock("../src/classes/Item", () => {
  return jest.fn().mockImplementation((...args) => {
    return {
      taxIncludedPrice: 10
    };
  });
});
import Item from "../src/classes/Item";

jest.mock("../src/utils");
import * as Utils from "../src/utils";
Utils.sum.mockReturnValue(1000);

jest.mock("../src/apis");
import * as Apis from "../src/apis";
Apis.getItems.mockResolvedValue({
  items: [
    { key: 1, name: "the1", price: 1, taxRate: 0.08 },
    { key: 2, name: "the2", price: 2, taxRate: 0.1 }
  ]
});

import { main } from "../src/index";

describe("index", () => {
  describe("main", () => {
    beforeAll(() => {
      Utils.sum.mockClear();
      Apis.getItems.mockClear();
    });
    test("", async () => {
      const result = await main();
      expect(Apis.getItems).toHaveBeenCalledTimes(1);
      expect(Apis.getItems.mock.calls[0][0]).toBe(10);

      expect(Item).toHaveBeenCalledTimes(2);
      expect(Utils.sum).toHaveBeenCalledTimes(1);
      expect(result).toBe(1000);
    });
  });
});
