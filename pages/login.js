import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { login, loading } = useContext(AuthContext);
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    console.log("response on submit ",response)
    if (response.success) {
      // Store token in local storage
     // localStorage.setItem('token', response.token); // Ensure token is stored
      router.push('/');
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="bg-purple-600 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="text-center text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="border p-2.5 w-full rounded-md text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200"
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
              className="border p-2.5 w-full rounded-md text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-white text-purple-600 px-4 py-2.5 w-full font-bold rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200"
          >
            {loading ? "Loading....":"Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white text-sm sm:text-base">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-white font-semibold underline hover:text-purple-200 transition duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
