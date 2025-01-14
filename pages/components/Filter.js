import React from 'react';

function Filter({ handlePriceChange, selectedFilters }) {
  // Ensure selectedFilters and priceRange are defined
  const priceRange = selectedFilters?.priceRange || { min: 0, max: 2000 };

  return (
    <div className="mb-8 ">
      <h3 className="text-lg font-semibold mb-4 text-gray-400">Price Range</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 block mb-2">Minimum ($)</label>
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
            className="w-full px-4 text-black py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            min="0"
            max={priceRange.max}
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-2">Maximum ($)</label>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            min={priceRange.min}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
