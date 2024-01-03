import React, { Fragment, useRef, useState, useEffect } from "react";
import { CategoryModel } from "../../components/private/CategoryModel";
import { Modal } from "./Modal";
import BrandService from "../../Services/Brand.service";
import { ProductForm } from "../../components/partials";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductEdition } from "../../components/private";

export const AddProducts = () => {
    const categories = useSelector((state) => state.categories.data);
    const categoriesLoading = useSelector((state) => state.categories.loading);

    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editing, setEditing] = useState({ status: false, data: {} });
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const { designation } = useParams("designation");

    const fetchData = async () => {
        try {
            const { data: brandsData } = await BrandService.All();
            setBrands(brandsData);
            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        fetchData();
    }, [loading]);

    return (
        <div className="flex   w-full space-x-3  ">
            <div className="bg-white w-4/6 shadow-md rounded-md pt-10 ">
                <div className="h-10 border-b border-gray-400 border-opacity-50 flex flex-col justify-center items-center ">
                    <label className="text-gray-500 ml-2 flex ">
                        Informations sur les Articles
                    </label>
                </div>
                {typeof designation === "undefined" && (
                    <ProductForm categories={categories} brands={brands} />
                )}
                {typeof designation !== "undefined" && (
                    <ProductEdition
                        categories={categories}
                        brands={brands}
                        designation={designation}
                    />
                )}
            </div>
            <div className="bg-gray-200 w-2/6  flex flex-col">
                <div className=" bg-white flex w-full  h-20 shadow-md rounded-t-md  py-10 border-b border-gray-400 border-opacity-50 ">
                    <span className="text-gray-500 ml-2 flex">
                        Options de Categories
                    </span>
                </div>
                <div className="relative w-full h-1/4 shadow-md rounded-t-none items-center justify-center bg-white pt-4 mb-10 rounded-b">
                    {categoriesLoading && "loading..."}
                    {!categoriesLoading && (
                        <div className=" grid  grid-cols-2  gap-4  overflow-scroll  h-3/4  mx-2 scrollbar-hide ">
                            {categories.map((category) => (
                                <CategoryModel
                                    key={category.id}
                                    id={category.id}
                                    img={category.image}
                                    name={category.nom}
                                    setShowModal={setShowCategoryModal}
                                    type="category"
                                    setEditing={setEditing}
                                />
                            ))}
                            <Modal
                                showModal={showCategoryModal}
                                setShowModal={setShowCategoryModal}
                                loading={loading}
                                setLoading={setLoading}
                                title="Nouvelle Categorie"
                                type="category"
                                editing={editing}
                                setEditing={setEditing}
                            />
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => setShowCategoryModal(true)}
                        className="flex w-11/12 my-4 mx-4 bg-blue-500 rounded-md  text-white  justify-center items-center p-1   hover:bg-blue-600  transition duration-300 ease-in-out focus-within:outline-none py-2"
                    >
                        <span className="text-xl uppercase font-medium ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
                <div className=" bg-white flex w-full  h-20 shadow-md rounded-t-md  py-10 border-b border-gray-400 border-opacity-50">
                    <span className="text-gray-500 ml-2 flex">
                        Options sur les marques
                    </span>
                </div>
                <div className=" relative w-full h-1/4 flex flex-col shadow-md rounded-b-md  justify-center mb-3 pt-4 bg-white ">
                    <div className=" grid  grid-cols-2  gap-4  overflow-scroll h-3/4 mx-2 scrollbar-hide  ">
                        {brands.map((brand) => (
                            <CategoryModel
                                key={brand.id}
                                id={brand.id}
                                img={brand.logo}
                                name={brand.nom}
                                setLoading={setLoading}
                                setEditing={setEditing}
                                setShowModal={setShowBrandModal}
                                type="brand"
                            />
                        ))}
                        <Modal
                            showModal={showBrandModal}
                            setShowModal={setShowBrandModal}
                            loading={loading}
                            setLoading={setLoading}
                            title="Nouvelle Marque"
                            editing={editing}
                            setEditing={setEditing}
                            type="brand"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowBrandModal(true)}
                        className="flex w-11/12 my-4 mx-4  bg-blue-500 rounded-md  text-white  justify-center items-center p-1   hover:bg-blue-600  transition duration-300 ease-in-out focus-within:outline-none py-2"
                    >
                        <span className="text-xl uppercase font-medium">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
