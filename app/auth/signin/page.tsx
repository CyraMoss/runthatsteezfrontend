"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.log("Error: ", result);
      setError(result.error);
    } else {
      console.log("Success");
      // Wait for session to be updated
      setTimeout(() => {
        if (session?.user?.id) {
          router.push(`/profile/${session.user.id}`);
        }
      }, 500); // Adjust timeout as needed
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      router.push(`/profile/${session.user.id}`);
    }
  }, [status, session, router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="mt-6 text-center">
        <p>Don&apos;t have an account?</p>
        <Link href="/auth/new-user">
          <p className="text-blue-500 hover:underline">Sign up here</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
