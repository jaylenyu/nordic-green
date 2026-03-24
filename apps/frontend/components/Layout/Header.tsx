import styled from "@emotion/styled";
import { useScreenWidth } from "hooks/useScreenWidth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const { data: session } = useSession();
  const screenWitdh = useScreenWidth();
  const router = useRouter();

  return (
    <div className="w-full relative">
      <div className="fixed w-full flex justify-between gap-5 h-20 bg-white px-5 shadow-xl z-50">
        <ul className="flex gap-5 md:gap-3 sm:gap-2 sx:gap-2 items-center">
          {screenWitdh >= 1023 || (
            <HeaderList onClick={() => router.push("/")}>Home</HeaderList>
          )}
          <HeaderList onClick={() => router.push("/products")}>
            Products
          </HeaderList>
          <HeaderList onClick={() => router.push("/wishlist")}>
            Wishlist
          </HeaderList>
          <HeaderList onClick={() => router.push("/cart")}>Cart</HeaderList>
          <HeaderList onClick={() => router.push("/order")}>Order</HeaderList>
        </ul>
        {screenWitdh >= 1023 && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              className="hover:cursor-pointer"
              src="/Logo.png"
              alt="Logo"
              priority
              unoptimized
              width={250}
              height={80}
              onClick={() => router.push("/")}
            />
          </div>
        )}
        <ul className="flex gap-5 md:gap-3 sm:gap-2 sx:gap-2 items-center">
          {screenWitdh >= 400 &&
            session?.user?.name &&
            session?.user?.image && (
              <>
                <HeaderList>
                  <img
                    className="w-10 h-10 sx:w-5 sx:h-5 rounded-full"
                    src={session.user.image}
                    alt="user"
                  />
                </HeaderList>
                <HeaderList>{session?.user?.name}님</HeaderList>
              </>
            )}
          {session ? (
            <HeaderList onClick={() => signOut()}>Logout</HeaderList>
          ) : (
            <HeaderList onClick={() => signIn()}>Login</HeaderList>
          )}
        </ul>
      </div>
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

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
