import { MyEnums } from "../../src/constants/Constants";

describe("Constants", () => {
  describe("MyEnums", () => {
    it('have the "theX"', () => {
      expect(MyEnums).toHaveProperty("theX", "theX");
    });
    it('have the "theY"', () => {
      expect(MyEnums).toHaveProperty("theY", "theY");
    });
  });
});
