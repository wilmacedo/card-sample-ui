"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("willpay@auth");
    if (token) {
      deleteCookie("willpay@auth");
    }

    router.push("/");
  }, [router]);

  return (
    <div>
      <span>Redirecting...</span>
    </div>
  );
}
