import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FilterContextProvider } from '@/contexts/FilterContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
 import "@/styles/globals.css"

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4">
      <h2 className="text-xl font-bold mb-2">Something went wrong:</h2>
      <pre className="text-red-500 mb-4">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (err) => {
      setError(err);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => setError(null)} />;
  }

  return (
    <AuthProvider>

      <FilterContextProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </FilterContextProvider>
    </AuthProvider>
  );
}
