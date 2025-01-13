// filepath: /c:/Users/Lenovo/Music/ecomm-renderings/pages/components/AppContext.js
import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        brands: [],
        priceRange: { min: 0, max: 2000 },
    });

    return (
        <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
            {children}
        </FilterContext.Provider>
    );
};