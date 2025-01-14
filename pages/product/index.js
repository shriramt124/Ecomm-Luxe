import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import ProductCard from '../UI/ProductCard';
import MobileFilter from '../UI/MobileFilter';
import { filterOptions } from '@/utils/constants';
import Loader from '../UI/Loader';
import SearchBar from '../UI/SearchBar';
import { FilterContext } from '@/contexts/FilterContext';

const ProductPage = ({ initialProducts, initialPagination, initialFilters }) => {
    const router = useRouter();
    const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
    const [products, setProducts] = useState(initialProducts || []);
    const [loading, setLoading] = useState(false);
    const [totalProducts, setTotalProducts] = useState(initialPagination?.total || 0);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(initialPagination?.page || 1);
    const productsPerPage = 6;

    useEffect(() => {
        setSelectedFilters(initialFilters);
    }, [initialFilters, setSelectedFilters]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchProducts(currentPage, selectedFilters, searchQuery);
        };

        fetchData();
    }, [currentPage, selectedFilters, searchQuery]);

    const fetchProducts = async (page, filters, search) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: page,
                limit: productsPerPage,
                search: search || '',
                minPrice: filters.priceRange.min || 0,
                maxPrice: filters.priceRange.max || 2000,
                ...(filters.categories.length > 0 && { categories: filters.categories.join(',') }),
                ...(filters.brands.length > 0 && { brands: filters.brands.join(',') })
            });

            const response = await fetch(
                `/api/product?${queryParams}`
            );
            const data = await response.json();
            console.log(data, "from index js file");
            setProducts(data.products || []);
            setTotalProducts(data.pagination?.total || 0);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const updateURL = (filters, search, page) => {
        const queryParams = {
            page: page,
            search: search || '',
            minPrice: filters.priceRange.min || 0,
            maxPrice: filters.priceRange.max || 2000,
            ...(filters.categories.length > 0 && { categories: filters.categories.join(',') }),
            ...(filters.brands.length > 0 && { brands: filters.brands.join(',') })
        };

        router.push({
            pathname: '/product',
            query: queryParams
        }, undefined, { shallow: true });
    };

    const toggleFilter = (type, value) => {
        const newFilters = {
            ...selectedFilters,
            [type]: selectedFilters[type].includes(value)
                ? selectedFilters[type].filter(item => item !== value)
                : [...selectedFilters[type], value]
        };
        setSelectedFilters(newFilters);
        setCurrentPage(1);
        updateURL(newFilters, searchQuery, 1);
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
        updateURL(newFilters, searchQuery, 1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
        updateURL(selectedFilters, e.target.value, 1);
    };

    return (
        <div className='flex flex-col gap-[100px] '>
            <div className="mt-[100px] min-h-screen bg-gray-50">
                <MobileFilter setMobileFilterOpen={setMobileFilterOpen} mobileFilterOpen={mobileFilterOpen} />

                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className={`lg:w-1/4 ${mobileFilterOpen ? 'fixed inset-0 z-40 bg-white overflow-y-auto p-4' : 'hidden lg:block'}`}>
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <div className="flex justify-between items-center lg:hidden mb-4 mt-[50px] ">
                                    <h2 className="text-2xl font-bold text-black">Filters</h2>
                                    <button onClick={() => setMobileFilterOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                                </div>

                                <Filter handlePriceChange={handlePriceChange} selectedFilters={selectedFilters} />

                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-400">Categories</h3>
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
                                                    <span className="ml-3 text-gray-700 group-hover:text-purple-600 transition-colors">{category.name}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-500">Brands</h3>
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
                                                    <span className="ml-3 text-gray-700 group-hover:text-purple-600 transition-colors">{brand.name}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-3/4 text-gray-400">
                            <div className="mb-8">
                                <SearchBar handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
                            </div>

                            <div className="mb-6 text-gray-600">
                                Showing {Math.min(products.length, productsPerPage)} of {loading ? "loading..." : totalProducts} products
                            </div>

                            <div className={`grid grid-cols-1 ${loading ? "md:grid-cols-1" : "md:grid-cols-2"} ${loading ? "xl:grid-cols-1" : "xl:grid-cols-3"} gap-6`}>
                                {loading ? <Loader /> : products?.map(product => (
                                    product && <ProductCard key={product._id} product={product} />
                                ))}
                            </div>

                            {products.length === 0 && !loading && (
                                <div className="text-center py-12">
                                    <p className="text-xl text-gray-600">No products found matching your criteria.</p>
                                </div>
                            )}

                            <Pagination setCurrentPage={setCurrentPage} initialPagination={initialPagination} currentPage={currentPage} />
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

    const filters = {
        categories: typeof query.categories === 'string'
            ? query.categories.split(',')
            : Array.isArray(query.categories)
                ? query.categories
                : [],

        brands: query.brands ? query.brands.split(',') : [],

        priceRange: {
            min: parseInt(query.minPrice) || 0,
            max: parseInt(query.maxPrice) || 2000
        }
    };

    try {
        const queryParams = new URLSearchParams();

        Object.keys(query).forEach(key => {
            if (Array.isArray(query[key])) {
                query[key].forEach(value => queryParams.append(key, value));
            } else {
                queryParams.append(key, query[key]);
            }
        });

        const response = await fetch(`http://localhost:3000/api/product?${queryParams}`);
        const data = await response.json();

        return {
            props: {
                initialProducts: data.products || [],
                initialPagination: data.pagination || {},
                initialFilters: filters
            },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                initialProducts: [],
                initialPagination: {},
                initialFilters: filters
            },
        };
    }
}
