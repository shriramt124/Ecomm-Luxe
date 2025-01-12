import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import ProductCard from '../UI/ProductCard';
import Header from '../components/Header';
const ProductPage = ({ initialProducts,initialPagination }) => {
    const router = useRouter();
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);
    const [totalProducts, setTotalProducts] = useState(initialPagination.total);

    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        brands: [],
        priceRange: { min: 0, max: 2000 }
    });

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(initialPagination.page);
    const productsPerPage = 6;

    // Sample filter options (keep the same as your original code)
    const filterOptions = {
        categories: [
            { name: 'New Arrivals', count: 150 },
            { name: 'Luxury Watches', count: 450 },
            { name: 'Smart Watch', count: 380 },
            { name: 'Accessories', count: 220 },
            { name: 'Health & Beauty', count: 180 },
            { name: 'Home Appliances', count: 95 },
            { name: 'Electronics', count: 95 }
        ],
        brands: [
            { name: 'Rolex', count: 120 },
            { name: 'Gucci', count: 98 },
            { name: 'Louis Vuitton', count: 76 },
            { name: 'Cartier', count: 54 },
            { name: 'Hermès', count: 45 },
            { name: 'Prada', count: 38 }
        ]
    };

    // Function to fetch products with filters
    const fetchProducts = async (page, filters, search) => {
        setLoading(true);
        try {
             
            // Construct query parameters
            const queryParams = new URLSearchParams({
                page: page,
                limit: productsPerPage,
                search: search || '',
                minPrice: filters.priceRange.min || 0,
                maxPrice: filters.priceRange.max || 2000,
                ...(filters.categories.length > 0 && { categories: filters.categories.join(',') }),
                ...(filters.brands.length > 0 && { brands: filters.brands.join(',') })
            });

            console.log(queryParams?.toString(), 'query params')

            const response = await fetch(`/api/product?${queryParams.toString()}`);
            const data = await response.json();
            console.log(data, 'data')

            setProducts(data.products);
            setTotalProducts(data.total);

            // Update URL with current filters and page
            router.push({
                pathname: router.pathname,
                query: {
                    page,
                    search: search || undefined,
                    ...filters
                }
            }, undefined, { shallow: true });

        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch products when filters or page changes
    useEffect(() => {
        const fetchData = async () => {
           await fetchProducts(currentPage, selectedFilters, searchQuery);
        }
          fetchData();
        
         
    }, [currentPage, selectedFilters, searchQuery,setSelectedFilters]);

    const toggleFilter = (type, value) => {
        const newFilters = {
            ...selectedFilters,
            [type]: selectedFilters[type].includes(value)
                ? selectedFilters[type].filter(item => item !== value)
                : [...selectedFilters[type], value]
        };
        setSelectedFilters(newFilters);
        setCurrentPage(1);
    };

    const handlePriceChange = (type, value) => {
        const newFilters = {
            ...selectedFilters,
            priceRange: {
                ...selectedFilters.priceRange,
                [type]: Number(value)
            }
        };
        setSelectedFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className='flex flex-col gap-[100px] '>
            <Header />
        <div className=" mt-[100px] min-h-screen bg-gray-50">
            {/* Mobile filter button */}
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                >
                    {mobileFilterOpen ? '✕' : '☰'}
                </button>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <div
                        className={`lg:w-1/4 ${mobileFilterOpen
                                ? 'fixed inset-0 z-40 bg-white overflow-y-auto p-4'
                                : 'hidden lg:block'
                            }`}
                    >
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <div className="flex justify-between items-center lg:hidden mb-4">
                                <h2 className="text-2xl font-bold">Filters</h2>
                                <button
                                    onClick={() => setMobileFilterOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Price Range Filter */}
                             {/* <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-600 block mb-2">Minimum ($)</label>
                                        <input
                                            type="number"
                                            value={selectedFilters.priceRange.min}
                                            onChange={(e) => handlePriceChange('min', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                            min="0"
                                            max={selectedFilters.priceRange.max}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600 block mb-2">Maximum ($)</label>
                                        <input
                                            type="number"
                                            value={selectedFilters.priceRange.max}
                                            onChange={(e) => handlePriceChange('max', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                            min={selectedFilters.priceRange.min}
                                        />
                                    </div>
                                </div>
                            </div>  */}
                             <Filter handlePriceChange={handlePriceChange} selectedFilters={selectedFilters} />  

                            {/* Categories */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                                <div className="space-y-3">
                                    {filterOptions.categories.map(category => (
                                        <div key={category.name} className="flex items-center justify-between group">
                                            <label className="flex items-center cursor-pointer flex-1">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300"
                                                    checked={selectedFilters.categories.includes(category.name)}
                                                    onChange={() => toggleFilter('categories', category.name)}
                                                />
                                                <span className="ml-3 text-gray-700 group-hover:text-purple-600 transition-colors">
                                                    {category.name}
                                                </span>
                                            </label>
                                            <span className="text-sm text-gray-500">({category.count})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Brands</h3>
                                <div className="space-y-3">
                                    {filterOptions.brands.map(brand => (
                                        <div key={brand.name} className="flex items-center justify-between group">
                                            <label className="flex items-center cursor-pointer flex-1">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300"
                                                    checked={selectedFilters.brands.includes(brand.name)}
                                                    onChange={() => toggleFilter('brands', brand.name)}
                                                />
                                                <span className="ml-3 text-gray-700 group-hover:text-purple-600 transition-colors">
                                                    {brand.name}
                                                </span>
                                            </label>
                                            <span className="text-sm text-gray-500">({brand.count})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {/* Search Bar */}
                        <div className="mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search luxury items..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full px-6 py-4 bg-white rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 pl-12"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    🔍
                                </span>
                            </div>
                        </div>

                        {/* Results Summary
                        <div className="mb-6 text-gray-600">
                            Showing {Math.min(currentProducts.length, productsPerPage)} of {products.length} products
                        </div> */}

                        {/* Products Grid */}
                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products?.map(product => (
                                  <ProductCard key={product._id} product={product} />
                            ))}
                        </div>


                        {/* No Results Message */}
                        {products?.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600">No products found matching your criteria.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        <Pagination setCurrentPage={setCurrentPage} initialPagination={initialPagination} currentPage={currentPage}/>
                    </div>
                </div>
            </div>
            </div>
            </div>
    );
};

export default ProductPage;



export async function getServerSideProps({ query }) {
    const {
        page = 1,
        search = '',
        categories = '',
        brands = '',
        minPrice = 0,
        maxPrice = 2000
    } = query;

    try {
        const queryParams = new URLSearchParams({
            page,
            limit: 6,
            search,
           categories,
            brands,
            minPrice,
            maxPrice
        });
         
        const response = await fetch(
            `http://localhost:3000/api/product?${queryParams}`
        );
        const data = await response.json();
        console.log(data, 'data')

        return {
            props: {
                initialProducts: data.products,
                initialPagination: data.pagination
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                initialProducts: [],
                initialPagination: {
                    total: 0,
                    page: 1,
                    limit: 6,
                    totalPages: 1,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            }
        };
    }
}