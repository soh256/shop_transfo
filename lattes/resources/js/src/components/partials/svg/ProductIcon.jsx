import React from "react";

export const ProductIcon = (page) => {
    return (
        <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
            <path
                className={`fill-current text-gray-400 ${
                    page === "products" && "text-indigo-300"
                }`}
                d="M7 0l6 7H8v10H6V7H1z"
            />
            <path
                className={`fill-current text-gray-600 ${
                    page === "products" && "text-indigo-500"
                }`}
                d="M18 7v10h5l-6 7-6-7h5V7z"
            />
        </svg>
    );
};
