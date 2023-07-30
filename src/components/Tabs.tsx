"use client";

import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TabsProps {
  tabs: {
    title: string;
    children: ReactNode;
  }[];
}

export function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);

  function handleClick(index: number) {
    if (index === active) return;

    setActive(index);
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      data-testid="tabs"
    >
      <div className="bg-gray-800 p-1 rounded-md">
        {tabs.map(({ title }, index) => (
          <button
            key={index}
            data-selected={index === active}
            className={twMerge(
              "py-1.5 px-8 text-sm rounded-md transition-colors",
              "data-[selected=true]:bg-black"
            )}
            onClick={() => handleClick(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="w-full mt-8">
        {tabs.find((_, index) => index === active)?.children}
      </div>
    </div>
  );
}
