import { Fragment, ReactNode } from "react";

interface LogoutLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Redirecting..",
};

export default function LogoutLayout({ children }: LogoutLayoutProps) {
  return <Fragment>{children}</Fragment>;
}
