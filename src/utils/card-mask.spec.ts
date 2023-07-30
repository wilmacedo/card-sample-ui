import { cardMask } from "./card-mask";

describe("Card mask case", () => {
  it("should be a valid card mask", () => {
    const cardNumber = "1234567890123456";
    const maskedNumber = cardMask(cardNumber);

    expect(maskedNumber.split(" ")).toHaveLength(4);
  });
});
