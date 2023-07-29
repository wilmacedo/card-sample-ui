import { LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

export function Input({ icon: Icon, ...rest }: InputProps) {
  return (
    <div className="px-3 py-2 flex items-center gap-3 border-2 border-slate-800 bg-slate-800 rounded-md focus-within:border-slate-300">
      <Icon strokeWidth={1.25} size={20} />
      <input
        className={twMerge("bg-transparent text-sm outline-none")}
        {...rest}
      />
    </div>
  );
}
