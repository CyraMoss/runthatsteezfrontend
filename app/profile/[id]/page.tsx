'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getUserById } from '../../../services/userService';
import { User } from '../../../types/user';
import Image from 'next/image';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const userData = await getUserById(session.user.id);
      console.log('response', session.user.id, userData);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [session]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchUser();
    }
  }, [status, router, fetchUser]);

  if (status === 'loading' || !user) {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated' || !session) {
    return <p>You need to be signed in to view this page</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <Image
          src={user.image || 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'}
          alt="Profile"
          className="w-16 h-16 rounded-full"
            width={24}
            height={24}
        />
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
