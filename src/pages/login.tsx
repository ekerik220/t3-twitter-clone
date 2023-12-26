import { signIn, signOut, useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <button onClick={() => signIn("github")}>Sign in with Github</button>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => void signOut()}>Sign out</button>
      <h1>User:</h1>
      <div>{session?.user.name}</div>
      <div>{session?.user.email}</div>
    </div>
  );
};

export default Page;
