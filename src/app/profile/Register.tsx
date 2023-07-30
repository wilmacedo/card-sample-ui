"use client";

import { CardAnimated } from "@/components/CardAnimated";
import { Input } from "@/components/Input";
import { Card } from "@/types";
import { cardMask } from "@/utils/card-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
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
  const { register } = useForm<CardRegisterSchema>({
    resolver: zodResolver(cardRegisterSchema),
  });

  const card: Card = {
    cardholder: "",
    cvv: "",
    id: "",
    number: "",
  };

  function handleMaskNumber(event: ChangeEvent<HTMLInputElement>) {
    event.target.value = cardMask(event.target.value);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-full p-4 flex items-center justify-center rounded-md border border-gray-800">
        <form className="px-1 w-full">
          <label htmlFor="number">Number</label>
          <Input
            {...(register("number"),
            {
              onChange: handleMaskNumber,
            })}
            minLength={18}
            maxLength={19}
          />
        </form>
      </div>
      <CardAnimated isFlipped={false} card={card} />
    </div>
  );
}
