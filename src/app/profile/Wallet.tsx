"use client";

import { Button } from "@/components/Button";
import { CardAnimated } from "@/components/CardAnimated";
import { Card } from "@/types";
import { checkCardType } from "@/utils/check-card-type";
import { FolderRoot, Inbox } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface WalletProps {
  cards: Card[];
}

export function Wallet({ cards }: WalletProps) {
  const [selected, setSelected] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function getCard(index?: number) {
    const cardList = cards.map((card) => {
      const { number } = card;
      const regex = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm;

      const cardNumber = number.replace(regex, "XXXX XXXX XXXX ");
      return {
        ...card,
        number: cardNumber,
      };
    });

    let selectedIndex = index || selected;

    return cardList.find((_, index) => index === selectedIndex);
  }

  function getCardType(number: string) {
    return checkCardType(number) || "MASTERCARD";
  }

  function handleSelect(index: number) {
    if (flipped === true) setFlipped(false);
    if (selected === index) return;

    setSelected(index);
  }

  function handleFlip(index: number) {
    if (selected !== index) {
      handleSelect(index);
    }

    if (flipped === false) {
      setFlipped(true);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-full py-4 flex items-center justify-center rounded-md border border-gray-800">
        <div className="w-full flex flex-col max-h-[15rem] overflow-y-auto">
          {cards.length === 0 && (
            <div className="w-full flex items-center justify-center gap-2 text-sm text-gray-400">
              <Inbox size={16} />
              No one card are registered yet
            </div>
          )}
          {cards.length > 0 &&
            cards.map((card, index) => (
              <div
                key={index}
                data-selected={selected === index}
                className={twMerge(
                  "px-2.5 py-2 flex items-center justify-between border-b border-gray-800 cursor-pointer",
                  "hover:bg-gray-900",
                  "data-[selected=true]:bg-gray-900"
                )}
                onClick={() => handleSelect(index)}
              >
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-sm">{card.cardholder}</span>
                  <span className="text-xs text-gray-600">
                    {getCard(index)?.number}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Image
                    src={`/${getCardType(getCard()?.number || "")}-logo.png`}
                    width={100}
                    height={100}
                    alt={getCardType(getCard()?.number || "")}
                    className="h-[.85rem] w-auto"
                  />
                  <Button onClick={() => handleFlip(index)}>
                    <FolderRoot size={18} />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {cards.length > 0 && (
        <CardAnimated isFlipped={flipped} card={getCard()!} />
        // <div data-flipped={flipped} className="group w-full ">
        //   <div
        //     className={twMerge(
        //       "relative duration-1000 transition-all h-full bg-red-500",
        //       "[transform-style:preserve-3d]",
        //       "group-data-[flipped=true]:[transform:rotateY(180deg)]"
        //     )}
        //   >
        //     <div className="absolute -bottom-[4rem] [backface-visibility:hidden] w-full">
        //       <div className="flex justify-center">
        //         <div className="h-36 p-4 w-64 bg-slate-100 rounded-md">
        //           <div className="bg-black rounded-t-full w-6 h-[.75rem] rotate-90" />

        //           <div className="mt-12 flex flex-col gap-2">
        //             <span className="text-black">{getCard()?.number}</span>
        //             <div className="flex justify-between items-center">
        //               <span className="text-black text-sm">
        //                 {getCard()?.cardholder}
        //               </span>
        //               <Image
        //                 src={`/${getCardType(
        //                   getCard()?.number || ""
        //                 )}-logo.png`}
        //                 width={100}
        //                 height={100}
        //                 alt={getCardType(getCard()?.number || "")}
        //                 className="h-[1rem] w-auto"
        //               />
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="absolute -top-[5rem] w-full h-full bg-red-500 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        //       <div className="w-full flex item-center justify-center transition-all duration-500">
        //         <div className="h-36 w-64 bg-slate-100 rounded-md">
        //           <div className="my-4 w-full h-8 bg-gray-800" />

        //           <div className="px-6 mt-4 w-full flex justify-end">
        //             <span className="text-black">{getCard()?.cvv}</span>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </div>
  );
}
