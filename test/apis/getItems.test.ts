import fetchMock from "fetch-mock";
import { getItems } from "../../src/apis/getItems";

describe("getItems", () => {
  const okResponse = {
    items: [
      { key: 1, name: "the1", price: 1, taxRate: 0.08 },
      { key: 2, name: "the2", price: 2, taxRate: 0.1 }
    ]
  };

  beforeAll(() => {
    fetchMock.mock("/items?limit=1", {
      body: okResponse
    });
    fetchMock.mock("/items?limit=2", { body: { items: undefined } });
    fetchMock.mock("/items?limit=3", { body: { error: 1 } });
    fetchMock.mock("/items?limit=4", { body: "eeee" });
    fetchMock.mock("/items?limit=403", 403);
    fetchMock.mock("/items?limit=404", 404);
    fetchMock.mock("/items?limit=500", 500);
    fetchMock.mock("path:/items", {
      body: okResponse
    });
  });
  afterAll(() => {
    fetchMock.restore();
  });
  [100, 200].forEach(limit => {
    it(`will do GET request to /items with the specified parameter in queryString {limit: ${limit}}`, async () => {
      return getItems(limit).then(res => {
        expect(fetchMock.lastUrl()).toBe(`/items?limit=${limit}`);
        expect(fetchMock.lastOptions()?.method).toBe("GET");
      });
    });
  });
  describe("Success case", () => {
    it(`will be resolved with IGetItemsResponse`, async () => {
      return expect(getItems(1)).resolves.toStrictEqual(okResponse);
    });
  });
  describe("error case", () => {
    describe("when `response.item` is not defined", () => {
      it("will be rejected", async () => {
        return expect(getItems(2)).rejects.toBe("Failed to get items");
      });
    });
    describe("when response does not json format", () => {
      it("will be rejected", async () => {
        return expect(getItems(3)).rejects.toBe("Failed to get items");
      });
    });
    describe("when status is not 200", () => {
      ["403", "404", "500"].forEach(status => {
        it(`will be rejected. status = ${status}`, async () => {
          const limit = Number(status);
          return expect(getItems(limit)).rejects.toBe("Failed to get items");
        });
      });
    });
  });
});
