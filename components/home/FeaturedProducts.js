export default function FeaturedProducts() {
    const products = [
        { id: 1, name: 'Premium Product 1', price: '$99.99', image: '/api/placeholder/400/400' },
        { id: 2, name: 'Premium Product 2', price: '$149.99', image: '/api/placeholder/400/400' },
        { id: 3, name: 'Premium Product 3', price: '$199.99', image: '/api/placeholder/400/400' },
        { id: 4, name: 'Premium Product 4', price: '$299.99', image: '/api/placeholder/400/400' },
    ];

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Products</h2>
                    <p className="mt-4 text-lg text-gray-600">Discover our most popular items</p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
