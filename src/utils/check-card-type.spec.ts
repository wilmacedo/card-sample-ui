import { checkCardType } from "./check-card-type";

describe("Check card type case", () => {
  it("should be validate and return card type", () => {
    const number = "5555500830030331"; // Mastercard
    const type = checkCardType(number);

    expect(type).toBe("MASTERCARD");
  });

  it("should be validate and return visa type", () => {
    const number = "4111111111111111";
    const type = checkCardType(number);

    expect(type).toBe("VISA");
  });

  it("should be validate and return visa type", () => {
    const number = "378282246310005";
    const type = checkCardType(number);

    expect(type).toBe("AMEX");
  });

  it("should be validate and return visa type", () => {
    const number = "6200000000000000";
    const type = checkCardType(number);

    expect(type).toBe("CHINA_UNION_PAY");
  });

  it("should be validate and return visa type", () => {
    const number = "6011000990139424";
    const type = checkCardType(number);

    expect(type).toBe("DISCOVER");
  });

  it("should be validate and return visa type", () => {
    const number = "30569309025904";
    const type = checkCardType(number);

    expect(type).toBe("DINERS");
  });

  it("should be validate and return visa type", () => {
    const number = "3530111333300000";
    const type = checkCardType(number);

    expect(type).toBe("JCB");
  });

  it("should be not return card type if card is invalid", () => {
    const invalidNumber = "1234567890123456";
    const type = checkCardType(invalidNumber);

    expect(type).toBeNull();
  });
});
