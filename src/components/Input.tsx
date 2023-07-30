import { LucideIcon } from "lucide-react";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon: LucideIcon;
}

export function Input({ icon: Icon, className, ...rest }: InputProps) {
  return (
    <div
      className={twMerge(
        "px-3 py-2 flex items-center gap-3 border-2 border-slate-800 bg-slate-800 rounded-md",
        "focus-within:border-slate-300",
        "invalid:border-red-600",
        className
      )}
      data-testid="input"
    >
      <Icon strokeWidth={1.25} size={20} />
      <input
        className={twMerge("bg-transparent text-sm outline-none w-full")}
        {...rest}
      />
    </div>
  );
}
