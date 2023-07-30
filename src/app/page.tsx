"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Navbar } from "@/components/Navbar";
import { CreditCard, Mail, PauseCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = event.currentTarget.querySelector('input[type="email"]');
    if (!input) {
      router.push("/register");
      return;
    }

    const email = (input as HTMLInputElement).value;
    if (!email || email.length === 0) {
      router.push("/register");
      return;
    }

    router.push(`/register?email=${email}`);
  }

  return (
    <div className="w-screen h-screen">
      <Navbar />

      <div
        className={twMerge(
          "mt-12 mx-8",
          "sm:mx-24 sm:mt-24 md:mx-32 lg:mx-28 xl:mx-52"
        )}
      >
        <div
          className={twMerge(
            "flex flex-col",
            "lg:flex-row lg:items-center lg:justify-center"
          )}
        >
          <div className={twMerge("flex flex-col gap-4")}>
            <h3 className="text-lg">/ Take Controls on</h3>
            <h1
              className={twMerge(
                "text-7xl font-bold text-white",
                "sm:text-8xl"
              )}
            >
              Will Pay
            </h1>
            <span className="mt-4 text-sm font-light text-white text-opacity-70 max-w-xs">
              Manage{" "}
              <strong className="font-medium italic text-slate-200">
                Subscriptions
              </strong>{" "}
              from one place and pay on schedule that works for you.
            </span>

            <form
              className={twMerge(
                "flex flex-col items-center gap-2",
                "sm:flex-row"
              )}
              onSubmit={handleSubmit}
            >
              <Input
                className="w-full"
                icon={Mail}
                placeholder="wil.macedo.sa@gmail.com"
                type="email"
              />
              <Button
                className={twMerge("w-full whitespace-nowrap", "sm:w-auto")}
                color="secondary"
                type="submit"
              >
                Get Started
              </Button>
            </form>

            <span className="max-w-xs text-slate-600 text-xs">
              * Credit card validation is required
            </span>
          </div>

          <div className="mt-8 md:mt-12 lg:mt-0 lg:ml-auto">
            <div className="p-1 bg-black border border-slate-800 rounded-md">
              <div className="p-1 bg-gradient-to-b from-[#CF5185] from-10% to-50% rounded-md">
                <div
                  className={twMerge(
                    "py-8 flex flex-col gap-4 items-center justify-center bg-black rounded-md",
                    "md:py-12 lg:p-12",
                    "xl:py-24 xl:px-28"
                  )}
                >
                  <div className="p-4 w-64 bg-slate-100 rounded-md">
                    <div className="bg-black rounded-t-full w-6 h-[.75rem] rotate-90" />

                    <div className="mt-12 flex flex-col gap-2">
                      <span className="text-black">XXXX XXXX XXXX 3965</span>
                      <div className="flex justify-between items-center">
                        <span className="text-black text-sm">Wil Macedo</span>
                        <Image
                          src="/mastercard-logo.png"
                          width={100}
                          height={100}
                          alt="Mastercard"
                          className="h-[1rem] w-auto"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 w-full">
                    <Button
                      className="w-full inline-flex items-center justify-center gap-2"
                      disabled
                    >
                      <PauseCircle strokeWidth={1.25} size={18} />
                      Pause subscription
                    </Button>
                    <Button
                      className="w-full inline-flex items-center justify-center gap-2"
                      color="secondary"
                      disabled
                    >
                      <CreditCard strokeWidth={1.25} size={18} />
                      Add subscription
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
