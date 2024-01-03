import React from "react";

export const OrderIcon = (page) => {
    return (
        <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
            <path
                className={`fill-current text-gray-400 ${
                    page === "orders" && "text-indigo-300"
                }`}
                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
            />
            <path
                className={`fill-current text-gray-700 ${
                    page === "orders" && "text-indigo-600"
                }`}
                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
            />
            <path
                className={`fill-current text-gray-600 ${
                    page === "orders" && "text-indigo-500"
                }`}
                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
            />
        </svg>
    );
};
