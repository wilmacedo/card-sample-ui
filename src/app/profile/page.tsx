import { Navbar } from "@/components/Navbar";
import { Tabs } from "@/components/Tabs";
import { env } from "@/env";
import { AuthData, Card } from "@/types";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";
import { Register } from "./Register";
import { Wallet } from "./Wallet";

async function getCardList(userId: string, token: string | null) {
  const request = await fetch(env.HOST + "/cards/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token),
    },
  });

  if (!request.ok) {
    return [];
  }

  const response = await request.json();
  if (!response.cards) return [];

  return response.cards as Card[];
}

export default async function Profile() {
  function getToken() {
    const cookie = cookies().get("willpay@auth");
    if (!cookie) return null;

    return cookie.value;
  }

  function retrievePayload(): AuthData {
    const defaultPayload: AuthData = {
      user: {
        email: "unkown@gmail.com",
        name: "Unkwon",
        id: "unkwon",
      },
    };

    const jwt = getToken();
    if (!jwt) return defaultPayload;

    const tokens = jwt.split(".");
    try {
      const payload: AuthData = JSON.parse(atob(tokens[1]));
      if (!payload.user.name || !payload.user.email || !payload.user.id)
        return defaultPayload;

      return payload;
    } catch (error) {
      return defaultPayload;
    }
  }

  const {
    user: { name, id },
  } = retrievePayload();

  const cardList = await getCardList(id, getToken());

  function getDateName() {
    const date = new Date();

    const weekday = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "long" });

    return `${weekday}, ${month}`;
  }

  return (
    <div className="w-screen h-screen">
      <Navbar context="privaty" />

      <div
        className={twMerge(
          "pt-6 mx-2 flex flex-col",
          "sm:mx-24 sm:justify-between md:mx-32 lg:mx-52"
        )}
      >
        <div className="my-8 p-1 bg-black border border-slate-800 rounded-md">
          <div className="p-1 bg-gradient-to-b from-[#CF5185] from-10% to-50% rounded-md">
            <div className="w-full py-4 flex flex-col items-center justify-center gap-2 bg-black rounded-md">
              <span className="text-gray-300 text-sm">{getDateName()}</span>
              <h3 className="text-white text-xl">Welcome, {name}</h3>

              <div className="mt-2 px-3.5 py-2.5 flex items-center rounded-md text-xs bg-gray-800">
                <span className="inline-flex items-center gap-1">
                  <strong className="text-base font-semibold">
                    {cardList.length}
                  </strong>{" "}
                  Cards
                </span>
                <div className="mx-4 h-4 w-[1px] bg-white" />
                <span className="inline-flex items-center gap-1">
                  <strong className="text-base font-semibold">$0</strong>
                  Saved
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          tabs={[
            { title: "Wallet", children: <Wallet cards={cardList} /> },
            { title: "Register", children: <Register /> },
          ]}
        />
      </div>
    </div>
  );
}
