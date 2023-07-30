import { checkCardType } from "./check-card-type";

describe("Check card type case", () => {
  it("should be validate and return card type", () => {
    const number = "5555500830030331"; // Mastercard
    const type = checkCardType(number);

    expect(type).toBe("MASTERCARD");
  });

  it("should be not return card type if card is invalid", () => {
    const invalidNumber = "1234567890123456";
    const type = checkCardType(invalidNumber);

    expect(type).toBeNull();
  });
});
