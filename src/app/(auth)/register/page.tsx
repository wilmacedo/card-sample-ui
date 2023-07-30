"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Register() {
  const search = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  function getEmail() {
    const email = search.get("email");
    if (!email || email.length === 0) return "";

    return email;
  }

  async function handleRegister(data: RegisterSchema) {
    try {
      const request = await fetch(env.HOST + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (request.status !== 201) {
        const response = await request.json();

        toast({
          title: `Oops! ${response.message}`,
        });
        return;
      }

      router.push("/login");
    } catch (error) {
      toast({
        title: `Oops! ${(error as any).message}`,
      });
    }
  }

  return (
    <div
      className={twMerge(
        "h-screen pt-6 mx-2 flex flex-col",
        "sm:mx-24 sm:justify-between md:mx-32 lg:mx-52"
      )}
    >
      <Link href="/">
        <div className="flex items-center justify-center gap-4">
          <div className="bg-white rounded-t-full w-8 h-4 rotate-90" />
          <span
            className={twMerge("text-xs cursor-pointer", "hover:underline")}
          >
            / wil.macedo.sa@gmail.com
          </span>
        </div>
      </Link>

      <div className="m-auto p-8">
        <div className="p-1 bg-black border border-slate-800 rounded-md">
          <div className="p-1 bg-gradient-to-b from-[#CF5185] from-10% to-50% rounded-md">
            <form
              className="flex flex-col bg-black px-16 py-12 w-[27.5rem]"
              onSubmit={handleSubmit(handleRegister)}
            >
              <label htmlFor="email">E-mail</label>
              <Input
                {...register("email")}
                icon={Mail}
                name="email"
                type="email"
                defaultValue={getEmail()}
                placeholder="wil.macedo.sa@gmail.com"
              />

              <label className="mt-6" htmlFor="name">
                Name
              </label>
              <Input
                {...register("name")}
                icon={User}
                name="name"
                type="text"
                placeholder="Wil Macedo"
                minLength={3}
              />

              <label className="mt-6" htmlFor="password">
                Password
              </label>
              <Input
                {...register("password")}
                icon={Lock}
                name="password"
                type="password"
                placeholder="Password"
                minLength={6}
              />

              <Button
                className="mt-12"
                color="secondary"
                type="submit"
                disabled={!isValid}
              >
                Register
              </Button>
              <span className="mt-2 text-xs text-center text-white text-opacity-70">
                Already have account?{" "}
                <Link href="/login" className="text-white hover:underline">
                  Log in
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
