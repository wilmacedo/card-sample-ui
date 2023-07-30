"use client";

import { Button } from "@/components/Button";
import { CardAnimated } from "@/components/CardAnimated";
import { Input } from "@/components/Input";
import { Card } from "@/types";
import { cardMask } from "@/utils/card-mask";
import { expirationMask } from "@/utils/expiration-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const cardRegisterSchema = z.object({
  number: z.string().min(14).max(16),
  cardholder: z.string().min(3),
  expiration: z.coerce.date(),
  cvv: z.string().min(3).max(4),
});

type CardRegisterSchema = z.infer<typeof cardRegisterSchema>;

export function Register() {
  const [flipped, setFlipped] = useState(false);
  const { register, watch } = useForm<CardRegisterSchema>({
    resolver: zodResolver(cardRegisterSchema),
    defaultValues: {
      number: "",
    },
  });

  const values = watch();
  const card: Card = { ...values, id: "" };

  function handleMaskNumber(event: ChangeEvent<HTMLInputElement>) {
    event.target.value = cardMask(event.target.value);
  }

  function handleMaskCVV(event: ChangeEvent<HTMLInputElement>) {
    event.target.value = event.target.value.replace(/\D/g, "");
  }

  function handleMaskExpiration(event: ChangeEvent<HTMLInputElement>) {
    let maskedValue = expirationMask(event.target.value);

    if (maskedValue.length === 3 && maskedValue[2] === "/") {
      maskedValue = maskedValue.slice(0, 2);
    }

    event.target.value = maskedValue;
  }

  function flipCard() {
    if (flipped) return;

    setFlipped(true);
  }

  function unflipCard() {
    if (!flipped) return;

    setFlipped(false);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-full p-4 flex items-center justify-center rounded-md border border-gray-800">
        <form className="px-1 w-full flex flex-col gap-2 text-sm">
          <label htmlFor="number">Number</label>
          <Input
            {...register("number", {
              onChange: handleMaskNumber,
            })}
            name="number"
            minLength={18}
            maxLength={19}
            placeholder="1234 5678 9812 3456"
          />

          <label className="mt-4" htmlFor="cardholder">
            Cardholder
          </label>
          <Input
            {...register("cardholder")}
            name="cardholder"
            minLength={3}
            placeholder="Wil Macedo"
          />

          <div className="flex gap-2">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="expiration">Expiration</label>
              <Input
                {...register("expiration", {
                  onChange: handleMaskExpiration,
                })}
                name="expiration"
                placeholder="11/23"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="cvv">CVV</label>
              <Input
                {...register("cvv", {
                  onBlur: unflipCard,
                  onChange: handleMaskCVV,
                })}
                name="cvv"
                placeholder="123"
                onFocus={flipCard}
                minLength={3}
                maxLength={4}
              />
            </div>
          </div>

          <Button className="mt-4" color="secondary">
            Add
          </Button>
        </form>
      </div>
      <CardAnimated isFlipped={flipped} card={card} />
    </div>
  );
}
