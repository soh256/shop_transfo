import React, { useState, useRef, useEffect } from "react";
import ProductService from "../../../Services/Product.service";
import CategoryService from "../../../Services/Category.service";
import { useParams } from "react-router";
import { searchFilter } from "./searchFilter";
import { Link } from "react-router-dom";

const SearchInput = () => {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    const dropdownRef = useRef(null);
    const [resultData, setResultData] = useState([]);
    // click away listener
    useEffect(() => {
        document.addEventListener("mousedown", handleClick, false);

        return () =>
            document.removeEventListener("mousedown", handleClick, false);
    }, []);

    const handleClick = (e) => {
        if (dropdownRef.current.contains(e.target)) {
            return;
        }
        setVisible(false);
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        if (!visible && searchValue.length > 0) {
            setVisible(true);
        }
        // if (searchValue === "") {
        //     setVisible(false);
        // }
    };

    const fetchData = async () => {
        try {
            const { data } = await ProductService.All();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchValue !== "") {
            setResultData(searchFilter(searchValue, products));
        } else {
            setResultData([]);
        }
    }, [searchValue, products]);

    return (
        <div className=" lg:w-9/12 flex flex-col items-center justify-center relative ">
            <div className=" hidden lg:flex w-full  space-y-2 justify-end">
                <input
                    type="text"
                    placeholder="Recherchez un produit,un article..."
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={() => {
                        setVisible(true);
                    }}
                    className="w-full rounded-md  border-2 border-blue-550 input"
                />
            </div>{" "}
            {/* responsive */}
            <div className="flex lg:hidden w-full  space-y-2 justify-end  ">
                <input
                    type="text"
                    placeholder="Recherchez un produit,un article..."
                    value={searchValue}
                    onChange={handleChange}
                    className="w-full rounded-full  border border-blue-550 text-sm "
                />
            </div>
            <div
                ref={dropdownRef}
                className={`w-full  overflow-x-hidden border  ${
                    visible ? "v" : ""
                } `}
            >
                {visible && (
                    <ul className=" bg-white  w-full h-auto max-h-72 overflow-auto scrollbar-hide  flex flex-col  items-center  rounded-lg   shadow-lg absolute ">
                        {!products && (
                            <li
                                key="zxc"
                                className="w-full pl-8 hover:bg-gray-100 py-1 font-medium lowercase text-gray-500 rounded-lg"
                            >
                                no result
                            </li>
                        )}
                        {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
                        {products &&
                            resultData.map((product) => (
                                <Link
                                    id="hidesearch"
                                    key={product.id}
                                    to={`/${product.designation}`}
                                    className="w-full px-8 hover:bg-gray-100 text-sm font-medium lowercase text-gray-500 py-2 rounded-lg flex justify-between"
                                >
                                    <span>{product.designation}</span>
                                </Link>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchInput;
