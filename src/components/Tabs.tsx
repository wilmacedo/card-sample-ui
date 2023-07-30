"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface TabsProps {
  tabs: {
    title: string;
    children: ReactNode;
  }[];
}

export function Tabs({ tabs }: TabsProps) {
  const router = useRouter();
  const search = useSearchParams();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const tabName = location.hash.slice(1);
    const tabIndex = tabs.findIndex(
      (tab) => tab.title.toLowerCase().replaceAll(" ", "") === tabName
    );

    if (tabIndex < 0) return;

    setActive(tabIndex);
  }, [search, tabs]);

  function handleClick(index: number) {
    if (index === active) return;

    setActive(index);

    const tab = tabs[index];
    router.push(`/profile#${tab.title.toLowerCase().replaceAll(" ", "")}`);
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
