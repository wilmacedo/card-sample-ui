import { Card } from "@/types";
import { checkCardType } from "@/utils/check-card-type";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface CardProps {
  card: Card;
  isFlipped: boolean;
}

export function CardAnimated({
  card: { number, cardholder, cvv },
  isFlipped,
}: CardProps) {
  return (
    <div data-flipped={isFlipped} className="group w-full ">
      <div
        className={twMerge(
          "relative duration-1000 transition-all h-full bg-red-500",
          "[transform-style:preserve-3d]",
          "group-data-[flipped=true]:[transform:rotateY(180deg)]"
        )}
      >
        <div className="absolute -bottom-[4rem] [backface-visibility:hidden] w-full">
          <div className="flex justify-center">
            <div className="h-36 p-4 w-64 bg-slate-100 rounded-md">
              <div className="bg-black rounded-t-full w-6 h-[.75rem] rotate-90" />

              <div className="mt-12 flex flex-col gap-2">
                <span className="h-6 text-black">{number}</span>
                <div className="flex justify-between items-center">
                  <span className="text-black text-sm">{cardholder}</span>
                  <Image
                    src={`/${checkCardType(number) || "MASTERCARD"}-logo.png`}
                    width={100}
                    height={100}
                    alt={checkCardType(number) || "MASTERCARD"}
                    className="h-[1rem] w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-[5rem] w-full h-full bg-red-500 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="w-full flex item-center justify-center transition-all duration-500">
            <div className="h-36 w-64 bg-slate-100 rounded-md">
              <div className="my-4 w-full h-8 bg-gray-800" />

              <div className="px-6 mt-4 w-full flex justify-end">
                <span className="text-black">{cvv}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
