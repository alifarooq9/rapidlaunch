import WebHeader from "@/app/(web)/_components/header";
import { Fragment } from "react";

interface WebLayoutProps {
  children: React.ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
  return (
    <Fragment>
      <WebHeader />
      {children}
    </Fragment>
  );
}
