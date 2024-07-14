'use client';

import { useState } from 'react';
import { signOut, useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserMenu = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    console.log("session for image", session?.user?.image);
    console.log("session for id", session?.user?.id);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  return (
    <div className="relative">
      {session ? (
        <div className="flex items-center space-x-2">
          <img
            src={session.user?.image || '/default-profile.png'}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-44 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Profile
              </Link>
              <Link href="/customerOrders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Orders
              </Link>
              {session.user?.role === 'ADMIN' && (
                <Link href="/admin" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Admin
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => signIn()} className="text-gray-600 hover:text-gray-800">
          Sign in
        </button>
      )}
    </div>
  );
};

export default UserMenu;
