/**
 * This is a regix list modification for Typescript for ProjectBroadcast test assessment.
 * Original implementation and list: https://locastic.com/blog/how-to-check-credit-card-type-with-javascript
 */

type CardType =
  | "VISA"
  | "AMEX"
  | "MASTERCARD"
  | "DISCOVER"
  | "DINERS"
  | "JCB"
  | "CHINA_UNION_PAY";

interface RegexType {
  type: CardType;
  regexs: string[];
}

export function checkCardType(number: string): CardType | null {
  const types: RegexType[] = [
    {
      type: "MASTERCARD",
      regexs: ["^5[1-5][0-9]{14}$", "^2[2-7][0-9]{14}$"],
    },
    {
      type: "VISA",
      regexs: ["^4[0-9]{12}(?:[0-9]{3})?$"],
    },
    {
      type: "AMEX",
      regexs: ["^3[47][0-9]{13}$"],
    },
    {
      type: "CHINA_UNION_PAY",
      regexs: ["^62[0-9]{14}[0-9]*$", "^81[0-9]{14}[0-9]*$"],
    },
    {
      type: "DISCOVER",
      regexs: [
        "^6011[0-9]{12}[0-9]*$",
        "^62[24568][0-9]{13}[0-9]*$",
        "^6[45][0-9]{14}[0-9]*$",
      ],
    },
    {
      type: "DINERS",
      regexs: ["^3[0689][0-9]{12}[0-9]*$"],
    },
    {
      type: "JCB",
      regexs: ["^35[0-9]{14}[0-9]*$"],
    },
  ];

  for (const { type, regexs } of types) {
    for (const regex of regexs) {
      const tester = new RegExp(regex);

      if (tester.test(number)) {
        return type;
      }
    }
  }

  return null;
}
