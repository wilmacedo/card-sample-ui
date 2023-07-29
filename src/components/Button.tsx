import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "primary" | "secondary";
}

const button = tv({
  base: twMerge(
    "px-3.5 py-2 text-sm text-slate-200 bg-slate-900 rounded-md",
    "hover:bg-slate-800",
    "disabled:cursor-not-allowed"
  ),
  variants: {
    color: {
      primary: twMerge("bg-[#CF5185]", "hover:bg-[#d16692]"),
      secondary: twMerge("bg-blue-600", "hover:bg-blue-500"),
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
