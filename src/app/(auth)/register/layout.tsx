import { Fragment, ReactNode } from "react";

interface RegisterLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Register",
};

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return <Fragment>{children}</Fragment>;
}
