"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginSchema) {
    const request = await fetch(env.HOST + "/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();
    if (request.status !== 200) {
      toast({
        title: `Oops! ${response.message}`,
      });
      return;
    }

    const { token } = response;
    if (!token) {
      toast({
        title: "Oops! Token not found",
      });
      return;
    }

    setCookie("willpay@auth", token, {
      maxAge: 60 * 60 * 24, // 1 day
    });

    router.push("/profile");
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
              onSubmit={handleSubmit(handleLogin)}
            >
              <label htmlFor="email">E-mail</label>
              <Input
                {...register("email")}
                icon={Mail}
                name="email"
                type="email"
                placeholder="wil.macedo.sa@gmail.com"
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
                Log in
              </Button>
              <span className="mt-2 text-xs text-center text-white text-opacity-70">
                Do not have account?{" "}
                <Link href="/register" className="text-white hover:underline">
                  Register
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
