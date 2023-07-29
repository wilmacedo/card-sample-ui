import { twMerge } from "tailwind-merge";
import { Button } from "./Button";

export function Navbar() {
  return (
    <nav className="pt-6 flex mx-8 sm:mx-24 md:mx-32 lg:mx-52 items-center justify-between ">
      <div className="flex items-center gap-2">
        <div className="bg-white rounded-t-full w-8 h-4 rotate-90" />
        <span className={twMerge("text-xs cursor-pointer", "hover:underline")}>
          / wil.macedo.sa@gmail.com
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button>Log In</Button>
        <Button color="primary">Get Started</Button>
      </div>
    </nav>
  );
}
