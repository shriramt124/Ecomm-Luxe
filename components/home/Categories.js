export default function Categories() {
    const categories = [
        { name: 'Electronics', image: '/api/placeholder/600/400' },
        { name: 'Fashion', image: '/api/placeholder/600/400' },
        { name: 'Home & Living', image: '/api/placeholder/600/400' },
    ];

    return (
        <section className="bg-gray-50 py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Shop by Category</h2>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div key={category.name} className="group relative overflow-hidden rounded-2xl">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 p-8">
                                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                                <button className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                                    Explore
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
