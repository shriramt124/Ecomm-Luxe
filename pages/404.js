import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
        Go back to Home
      </Link>
    </div>
  );
};

export default Custom404;
