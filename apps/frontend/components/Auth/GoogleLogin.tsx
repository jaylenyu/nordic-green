import { Button } from "antd";
import { useSession, signIn, signOut } from "next-auth/react";

export default function GoogleLogin() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      <Button className="w-40 h-16 bg-slate-200" onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
}
