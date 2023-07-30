import { Fragment, ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Login",
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <Fragment>{children}</Fragment>;
}
