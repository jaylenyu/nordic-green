import styled from "@emotion/styled";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="fixed w-full flex justify-between gap-5 h-20 bg-white px-5 shadow-xl z-50">
      <Image
        className="hover:cursor-pointer"
        src="/Logo.png"
        alt="Logo"
        priority
        unoptimized
        width={250}
        height={70}
        onClick={() => router.push("/")}
      />
      <ul className="flex gap-5 items-center">
        {session?.user?.name && session?.user?.image && (
          <>
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-3"
                src={session.user.image}
                alt="user"
              />
              <HeaderList>{session?.user?.name}님</HeaderList>
            </div>
          </>
        )}
        <HeaderList onClick={() => router.push("/wishlist")}>
          위시리스트
        </HeaderList>
        <HeaderList onClick={() => router.push("/cart")}>장바구니</HeaderList>
        <HeaderList onClick={() => router.push("/order")}>주문내역</HeaderList>
        {session ? (
          <HeaderList onClick={() => signOut()}>로그아웃</HeaderList>
        ) : (
          <HeaderList onClick={() => signIn()}>로그인</HeaderList>
        )}
      </ul>
    </div>
  );
}

const HeaderList = styled.li`
  font-size: 16px;
  font-weight: 500;

  :hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.3);
  }
`;
