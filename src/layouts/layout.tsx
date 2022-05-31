import React, { useEffect } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Header } from "./Header";

type IHeaderProps = {
  children: ReactNode;
};
const Layout = (props: IHeaderProps) => {
  const { data } = useSession();
  useEffect(() => {});
  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  );
};

export { Layout };
