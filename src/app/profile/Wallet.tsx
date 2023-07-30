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
      )}
    </div>
  );
}
