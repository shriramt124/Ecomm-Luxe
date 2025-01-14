import React from 'react'

function MobileFilter({setMobileFilterOpen, mobileFilterOpen}) {
  return (
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="bg-purple-600 text-white p-4 rounded-full z-50 shadow-lg hover:bg-purple-700 transition-colors"
          >
              {mobileFilterOpen ? '✕' : '☰'}
          </button>
      </div>
  )
}

export default MobileFilter