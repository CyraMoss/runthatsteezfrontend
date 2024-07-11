"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import NewUser from "../new-user/page";

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    async function fetchProviders() {
      const res = await getProviders();
      setProviders(res);
    }
    fetchProviders();
  }, []);

  return (
    <div>
      <h1>Sign In</h1>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
        <h1>Register</h1>
        <NewUser/>
    </div>
  );
}
