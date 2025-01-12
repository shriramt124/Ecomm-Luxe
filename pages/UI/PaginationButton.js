const PaginationButton = ({ page, currentPage, onClick, children, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 mx-1 rounded-lg text-sm sm:text-base md:text-lg lg:text-xl ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
            page === currentPage
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-purple-100'
            } transition-colors duration-200`}
    >
        {children}
    </button>
);
export default PaginationButton;
