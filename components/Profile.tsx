import { useSession } from 'next-auth/react';

const Profile: React.FC = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <p>Role: {session.user?.role}</p>
    </div>
  );
};

export default Profile;
