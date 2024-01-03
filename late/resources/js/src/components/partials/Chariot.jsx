import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export const Chariot = () => {
    return (
        <>
            <Link
                to="/cart"
                exact="true"
                className="focus-within:outline-none w-8 h-8 rounded-full text-center text-gray-100 bg-gray-500"
            >
                <FaShoppingCart />
            </Link>
        </>
    );
};
