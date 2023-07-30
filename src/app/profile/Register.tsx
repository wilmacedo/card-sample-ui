"use client";

import { Button } from "@/components/Button";
import { CardAnimated } from "@/components/CardAnimated";
import { Input } from "@/components/Input";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/env";
import { Card } from "@/types";
import { cardMask } from "@/utils/card-mask";
import { expirationMask } from "@/utils/expiration-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RegisterProps {
  token: string | null;
  userId: string;
}

const cardRegisterSchema = z.object({
  number: z.string().min(18).max(19),
  cardholder: z.string().min(3),
  expiration: z.string().length(5),
  cvv: z.string().min(3).max(4),
});

type CardRegisterSchema = z.infer<typeof cardRegisterSchema>;

export function Register({ token, userId }: RegisterProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [flipped, setFlipped] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<CardRegisterSchema>({
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

  async function handleRegister({
    number,
    cardholder,
    cvv,
    expiration,
  }: CardRegisterSchema) {
    number = number.replaceAll(" ", "");

    try {
      const [month, year] = expiration.split("/");
      const exp = new Date(`${"20" + year}-${month}-01`);

      const request = await fetch(env.HOST + "/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token),
        },
        body: JSON.stringify({
          number,
          cardholder,
          cvv,
          expiration: exp,
          userId,
        }),
      });

      if (request.status === 201) {
        toast({
          title: "Card added successfully!",
        });
        router.refresh();
        router.push("/profile#wallet");
        return;
      }

      const response = await request.json();

      toast({
        title: `Oops! ${response.message}`,
      });
    } catch (error) {
      toast({
        title: `Oops! ${(error as any).message}`,
      });
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-full p-4 flex items-center justify-center rounded-md border border-gray-800">
        <form
          className="px-1 w-full flex flex-col gap-2 text-sm"
          onSubmit={handleSubmit(handleRegister)}
        >
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

          <Button className="mt-4" color="secondary" disabled={!isValid}>
            Add
          </Button>
        </form>
      </div>
      <CardAnimated isFlipped={flipped} card={card} />
    </div>
  );
}
