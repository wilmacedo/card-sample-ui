import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { cookies } = request;

  const authData = cookies.get("willpay@auth");
  try {
    if (!authData) throw new Error();

    const { value } = authData;
    if (!value) throw new Error();

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/profile/:path*",
};
