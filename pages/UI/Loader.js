import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center  h-screen justify-center bg-gradient-to-br from-purple-300 via-purple-400 to-purple-600 rounded-md">
            <div className="relative flex items-center justify-center">
                {/* Glowing Pulsating Dot */}
                <div className="w-8 h-8 bg-purple-500 rounded-full animate-ping opacity-75"></div>

                {/* Rotating Outer Ring */}
                <div className="absolute w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>

                {/* Rotating Inner Ring */}
                <div className="absolute w-12 h-12 border-4 border-purple-200 border-b-purple-500 rounded-full animate-spin-reverse"></div>

                {/* Center Content */}
                <div className="absolute text-white font-bold text-lg">Loading...</div>
            </div>
        </div>
    );
};

export default Loader;
