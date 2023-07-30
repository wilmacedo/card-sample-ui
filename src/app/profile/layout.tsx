import { Fragment, ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Profile",
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <Fragment>{children}</Fragment>;
}
