'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getAllUsers } from '../../services/userService';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`/profile/${session.user.id}`);
      console.log("response", session.user.id,)
      setUser(response.data);
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
        <img
          src={user.image || '/default-profile.png'}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Role: {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
