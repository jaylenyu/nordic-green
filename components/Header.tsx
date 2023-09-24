import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-center gap-5 ">
      <div>Logo</div>
      <ul className="flex gap-5">
        <li onClick={() => router.push("/")}>product</li>
        <li onClick={() => router.push("/wishlist")}>wishlist</li>
        <li onClick={() => router.push("/cart")}>cart</li>
        <li onClick={() => router.push("/mypage")}>mypage</li>
        <li onClick={() => router.push("/auth/login")}>login</li>
      </ul>
    </div>
  );
}
