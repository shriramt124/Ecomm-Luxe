import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-[90vh] overflow-hidden bg-gray-900">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 mix-blend-multiply" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Discover Your Style
                        <span className="block text-purple-400">Embrace Your Uniqueness</span>
                    </h1>
                    <p className="mt-8 text-xl text-gray-300">
                        Explore our curated collection of premium products designed to elevate your lifestyle.
                    </p>
                    <div className="mt-12 flex gap-x-6">
                        <Link href="/shop" className="rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                            Shop Now
                        </Link>
                        <Link href="/collections" className="rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-purple-900">
                            View Collections
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}