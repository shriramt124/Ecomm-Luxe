import React, { useContext } from "react";

import { FilterContext } from '@/contexts/FilterContext';  
import { useRouter } from 'next/router';
import PaginationButton from "../UI/PaginationButton";

const Pagination = ({ initialPagination, currentPage, setCurrentPage }) => {
    const { totalPages } = initialPagination;
    const router = useRouter();
    const { selectedFilters } = useContext(FilterContext);

    if (totalPages <= 1) return null;

    let pages = [];
    if (totalPages <= 5) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
        if (currentPage <= 3) {
            pages = [1, 2, 3, 4, '...', totalPages];
        } else if (currentPage >= totalPages - 2) {
            pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const queryParams = {
            ...router.query,
            page: page,
            categories: selectedFilters.categories.join(','), // Preserve categories
            brands: selectedFilters.brands.join(','), // Preserve brands
            minPrice: selectedFilters.priceRange.min,
            maxPrice: selectedFilters.priceRange.max,
        };
        router.push({
            pathname: '/product',
            query: queryParams,
        }, undefined, { shallow: true });
    };

    return (
        <div className="flex text-black font-bold justify-center items-center mt-8 space-x-2 flex-wrap gap-2 md:gap-3">
            <PaginationButton
                page={currentPage - 1}
                currentPage={currentPage}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-xs sm:text-sm md:text-base"
            >
                ←
            </PaginationButton>

            {pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <span className="px-4 py-2 text-xs sm:text-sm md:text-base">...</span>
                    ) : (
                        <PaginationButton
                            page={page}
                            currentPage={currentPage}
                            onClick={() => handlePageChange(page)}
                            className="text-xs sm:text-sm md:text-base"
                        >
                            {page}
                        </PaginationButton>
                    )}
                </React.Fragment>
            ))}

            <PaginationButton
                page={currentPage + 1}
                currentPage={currentPage}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-xs sm:text-sm md:text-base"
            >
                →
            </PaginationButton>
        </div>
    );
};

export default Pagination;
