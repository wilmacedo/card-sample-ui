import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Navbar } from "@/components/Navbar";
import { Mail } from "lucide-react";
import { twMerge } from "tailwind-merge";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black">
      <Navbar />

      <div
        className={twMerge("mt-12 mx-8 sm:mx-24 md:mx-32 lg:mx-52", "sm:mt-24")}
      >
        <div className={twMerge("flex flex-col", "md:flex-row")}>
          <div className={twMerge("flex flex-col gap-4")}>
            <h3 className="text-lg">/ Take Controls on</h3>
            <h1 className="text-8xl font-bold">Will Pay</h1>
            <span className="mt-4 text-sm font-light text-white text-opacity-70">
              Manage{" "}
              <strong className="font-medium text-slate-200">
                Bill and Subscriptions
              </strong>{" "}
              from one place and pay on schedule that works for you.
            </span>

            <div className="flex items-center gap-2">
              <Input icon={Mail} placeholder="Your Email Address" />
              <Button color="secondary">Get Started</Button>
            </div>
          </div>

          <span>Right side</span>
        </div>
      </div>
    </div>
  );
}
