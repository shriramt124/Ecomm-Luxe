import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-[50px] items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="bg-purple-600 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">Register</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="text-center text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block mb-2 text-white text-sm sm:text-base"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              className="border p-2.5 w-full rounded-md text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 disabled:opacity-50"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-white text-sm sm:text-base"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="border p-2.5 w-full rounded-md text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 disabled:opacity-50"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-white text-sm sm:text-base"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="border p-2.5 w-full rounded-md text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 disabled:opacity-50"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-purple-600 px-4 py-2.5 w-full font-bold rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white text-sm sm:text-base">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-white font-semibold underline hover:text-purple-200 transition duration-200"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;