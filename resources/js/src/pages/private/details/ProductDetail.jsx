import React, { useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import ListLoader from "../../../components/loader/ListLoader";
import ProductService from "../../../Services/Product.service";
import BrandService from "../../../Services/Brand.service";
import CategoryService from "../../../Services/Category.service";
import { InputField } from "../../../components/partials/actions/InputField";
import { SelectField } from "../../../components/partials/actions/SelectField";
import { formatPrice } from "../../../helpers/format";

export const ProductDetail = () => {
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(true);

    const [product, setProduct] = useState({});
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const editorRef = useRef(null);
    const price = formatPrice(product.prix);

    const { id } = useParams();

    const fetchData = async (id) => {
        try {
            const { data } = await ProductService.Get(id);
            const { data: brandDatas } = await BrandService.All();
            const { data: categoryDatas } = await CategoryService.All();
            setProduct(data);
            setBrands(brandDatas);
            setCategories(categoryDatas);
            setProduct(data);
            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        fetchData(id);
    }, []);

    return (
        <>
            <div className="mb-8">
                <div className="text-lg text-center font-bold text-indigo-400">
                    Product Infomations
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="bg-white w-full h-full rounded-sm shadow-sm p-4">
                    {/* header */}
                    <div className="flex relative justify-end items-center border-b-2 border-gray-100 pb-2">
                        <div
                            className={`absolute h-20 ${
                                loading && "animate-pulse"
                            } w-20 bg-gray-300 shadow-lg rounded-md overflow-hidden z-50 left-0 bottom-5 flex items-center justify-center p-2`}
                        >
                            {!loading && (
                                <img
                                    src={product.image}
                                    alt={product.designation}
                                />
                            )}
                        </div>
                        <svg
                            className="flex-shrink-0 h-6 w-6 mr-3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className={`fill-current text-indigo-300`}
                                d="M7 0l6 7H8v10H6V7H1z"
                            />
                            <path
                                className={`fill-current text-indigo-500`}
                                d="M18 7v10h5l-6 7-6-7h5V7z"
                            />
                        </svg>
                    </div>
                    {/* data */}
                    {!loading && (
                        <div className="text-gray-400">
                            <div className="flex space-x-4">
                                <div className="w-2/5">
                                    <div className="my-4">
                                        <InputField
                                            value={product.designation}
                                            disabled={editing}
                                            placeholder="designation"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputField
                                            type="number"
                                            value={price}
                                            disabled={editing}
                                            placeholder="prix"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputField
                                            type="number"
                                            value={product.qte_stock}
                                            disabled={editing}
                                            placeholder="quantite en stock"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputField
                                            type="number"
                                            value={product.remise}
                                            disabled={editing}
                                            placeholder="remise"
                                        />
                                    </div>
                                    <div className="mb-4 z-50">
                                        <label>Marque</label>
                                        <SelectField
                                            data={brands}
                                            selectedIndex={product.marque.id}
                                        />
                                    </div>
                                    <div className="mb-4 ">
                                        <label>Categorie</label>
                                        <SelectField
                                            data={categories}
                                            selectedIndex={2}
                                        />
                                    </div>
                                </div>
                                <div className="w-3/5 mt-4">
                                    <Editor
                                        disabled={editing}
                                        onInit={(evt, editor) =>
                                            (editorRef.current = editor)
                                        }
                                        initialValue={product.description}
                                        init={{
                                            height: 220,
                                            menubar: false,
                                            plugins: [
                                                "advlist autolink lists link image charmap print preview anchor",
                                                "searchreplace visualblocks code fullscreen",
                                                "insertdatetime media table paste code help wordcount",
                                            ],
                                            toolbar:
                                                "undo redo | formatselect | " +
                                                "bold italic backcolor | alignleft aligncenter " +
                                                "alignright alignjustify | bullist numlist outdent indent | " +
                                                "removeformat | help",
                                            content_style:
                                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                        }}
                                    />
                                </div>
                            </div>
                            {/* image galerie */}
                            <div className="container mx-auto my-4 space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
                                {product.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="w-full max-h-48 overflow-hidden rounded hover:shadow-2xl"
                                    >
                                        <img
                                            src={image.url}
                                            alt={`image ${product.designation} ${image.id}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {loading && <ListLoader />}
                </div>
            </div>
        </>
    );
};
