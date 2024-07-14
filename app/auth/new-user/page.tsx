'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from '../../../utils/uploadthing';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', image: '' });
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      formData.image = 'https://utfs.io/f/90e0e042-4d26-4f7a-a0e5-296d2f870164-pset3e.png';
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage('Verification email sent, go back to login to continue.');
    } else {
      setMessage('Sign up failed. Please try again.');
    }
  };

  const handleUploadComplete = (url: string) => {
    setFormData({ ...formData, image: url });
    setIsUploading(false);
    alert("Upload Completed");
  };

  const handleUploadError = (error: Error) => {
    setIsUploading(false);
    alert(`ERROR! ${error.message}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        {message ? (
          <p className="text-center text-green-500">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Profile Image:</label>
              {!formData.image && (
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      handleUploadComplete(res[0].url);
                    }
                  }}
                  onUploadError={handleUploadError}
                />
              )}
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Profile"
                  className="mt-4 w-24 h-24 rounded-full object-cover"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Sign Up'}
            </button>
          </form>
        )}
        {message && (
          <div className="text-center mt-4">
            <button
              onClick={() => router.push('/auth/signin')}
              className="text-blue-500 hover:underline"
            >
              Go back to sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
