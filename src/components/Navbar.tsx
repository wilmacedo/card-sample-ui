import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";

export function Navbar() {
  return (
    <nav
      className={twMerge(
        "pt-6 mx-2 flex flex-col",
        "sm:mx-24 sm:flex-row sm:justify-between md:mx-32 lg:mx-52"
      )}
    >
      <div className="mx-auto flex items-center gap-2 sm:mx-0">
        <div className="bg-white rounded-t-full w-8 h-4 rotate-90" />
        <span className={twMerge("text-xs cursor-pointer", "hover:underline")}>
          / wil.macedo.sa@gmail.com
        </span>
      </div>
      <div
        className={twMerge(
          "mt-8 flex flex-col items-center gap-2",
          "sm:mt-0 sm:flex-row"
        )}
      >
        <Link href="/login">
          <Button className="w-full sm:w-auto">Log In</Button>
        </Link>
        <Link href="/register">
          <Button className="w-full sm:w-auto" color="primary">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
