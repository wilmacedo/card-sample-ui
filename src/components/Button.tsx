import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  color?: "primary";
}

const button = tv({
  base: twMerge(
    "px-3.5 py-2 text-sm text-slate-200 bg-slate-900 rounded-md",
    "hover:bg-slate-800"
  ),
  variants: {
    color: {
      primary: twMerge("bg-[#CF5185]", "hover:bg-[#d16692]"),
    },
  },
});

export function Button({
  color,
  className: propClass,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={twMerge(button({ color }), propClass)} {...rest}>
      {children}
    </button>
  );
}