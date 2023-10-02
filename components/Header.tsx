import styled from "@emotion/styled";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-between gap-5 h-20 bg-white px-5 mb-20">
      <Image
        className="hover:cursor-pointer"
        src="/Logo.png"
        alt="Logo"
        width={250}
        height={70}
        onClick={() => router.push("/")}
      />
      <ul className="flex gap-5 items-center">
        <HeaderList onClick={() => router.push("/")}>product</HeaderList>
        <HeaderList onClick={() => router.push("/wishlist")}>
          wishlist
        </HeaderList>
        <HeaderList onClick={() => router.push("/cart")}>cart</HeaderList>
        <HeaderList onClick={() => router.push("/mypage")}>mypage</HeaderList>
        {session ? (
          <HeaderList onClick={() => signOut()}>logout</HeaderList>
        ) : (
          <HeaderList onClick={() => signIn()}>login</HeaderList>
        )}
      </ul>
    </div>
  );
}

const HeaderList = styled.li`
  font-size: 16px;

  :hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.3);
  }
`;
