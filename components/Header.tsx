import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header>
      {session ? (
        <>
          <p>Welcome, {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </header>
  );
};

export default Header;
