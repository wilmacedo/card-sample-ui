import { expirationMask } from "./expiration-mask";

describe("Expiration mask case", () => {
  it("should be valid expiration mask", () => {
    const date = "1222";
    const maskedDate = expirationMask(date);

    expect(maskedDate.split("/")).toHaveLength(2);
    expect(maskedDate).toBe("12/22");
  });
});
