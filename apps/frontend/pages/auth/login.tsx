import GoogleLogin from "@components/Auth/GoogleLogin";
import React from "react";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GoogleLogin />
    </div>
  );
}
