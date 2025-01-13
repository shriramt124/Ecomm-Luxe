import React from 'react'

function SearchBar({ handleSearchChange, searchQuery  }) {
  return (
      <div className="relative">
          <input
              type="text"
              placeholder="Search luxury items..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-6 py-4 bg-white rounded-2xl text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 pl-12"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
          </span>
      </div>
  )
}

export default SearchBar