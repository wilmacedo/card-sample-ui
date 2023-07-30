import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes, Ref, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const Input = forwardRef(function Input(
  { icon: Icon, className, ...rest }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div
      className={twMerge(
        'px-3 py-2 flex items-center gap-3 border-2 border-slate-800 bg-slate-800 rounded-md',
        'focus-within:border-slate-300',
        'invalid-input',
        className,
      )}
      data-testid="input"
    >
      {Icon && <Icon strokeWidth={1.25} size={20} />}
      <input
        ref={ref}
        className={twMerge('bg-transparent text-sm outline-none w-full')}
        {...rest}
      />
    </div>
  );
});
