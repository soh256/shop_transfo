import React, { useCallback, useEffect, useState } from "react";
import Input from "@material-tailwind/react/Input";
import SelectImage from "../../assets/images/SelectImage.png";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import {
    EditorState,
    convertToRaw,
    ContentState,
    convertFromHTML,
} from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import ProductService from "../../Services/Product.service";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import Message from "../../redux/actions/message/Message";
import ProductAction from "../../redux/actions/product/Product";

const productSerializeProperty = {
    designation: "designation",
    description: "description",
    model: "model",
    qte_stock: "qte_stock",
    featured_image: "image",
    price: "prix",
    discount: "remise",
    ratings: "note",
    brand: "marque",
    category: "category",
    status: "statut",
    recommend: "recommend",
    in_coming: "in_coming",
};

const productDeserializeProperty = {
    designation: "designation",
    description: "description",
    model: "model",
    qte_stock: "qte_stock",
    image: "featured_image",
    prix: "price",
    remise: "discount",
    note: "ratings",
    marque: "brand",
    category: "category",
    statut: "status",
    recommend: "recommend",
    in_coming: "in_coming",
};

export const ProductEdition = ({ categories, brands, designation }) => {
    const [product, setProduct] = useState({ images: [] });
    const [productPayload, setProductPayload] = useState({});
    const [finalePayload, setFinalPayload] = useState({});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState({});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [imagePayload, setImagePayload] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = ({ target }) => {
        const { name, value, files } = target;

        if (name === "featured_image") {
            setFile({ ...file, url: URL.createObjectURL(files[0]) });
            setProductPayload({
                ...productPayload,
                [productSerializeProperty[name]]: files[0],
            });
            setFinalPayload({
                ...finalePayload,
                [productSerializeProperty[name]]: files[0],
            });
        } else if (name === "status") {
            setProductPayload({
                ...productPayload,
                [productSerializeProperty[name]]: !productPayload.statut,
            });
            setFinalPayload({
                ...finalePayload,
                [productSerializeProperty[name]]: !productPayload.statut,
            });
        } else if (name === "recommend") {
            setProductPayload({
                ...productPayload,
                [productSerializeProperty[name]]: !productPayload.recommend,
            });
            setFinalPayload({
                ...finalePayload,
                [productSerializeProperty[name]]: !productPayload.recommend,
            });
        } else if (name === "in_coming") {
            setProductPayload({
                ...productPayload,
                [productSerializeProperty[name]]: !productPayload.in_coming,
            });
            setFinalPayload({
                ...finalePayload,
                [productSerializeProperty[name]]: !productPayload.in_coming,
            });
        } else if (name === "category" || name === "brand") {
            setProductPayload({
                ...productPayload,
                [productSerializeProperty[name]]: parseInt(value),
            });
            setFinalPayload({
                ...finalePayload,
                [productSerializeProperty[name]]: parseInt(value),
            });
        } else {
            setProductPayload({
                ...productPayload,
                [productSerializeProperty[name]]: value,
            });
            setFinalPayload({
                ...finalePayload,
                [productSerializeProperty[name]]: value,
            });
        }
    };

    const handleEditor = (editorState) => {
        setProductPayload({
            ...productPayload,
            description: draftjsToHtml(
                convertToRaw(editorState.getCurrentContent())
            ),
        });
        setFinalPayload({
            ...finalePayload,
            description: draftjsToHtml(
                convertToRaw(editorState.getCurrentContent())
            ),
        });
        setEditorState(editorState);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data } = await ProductService.Get(designation);
            let customData = { ...data };
            setLoading(false);
            setProduct(data);
            delete customData.id;
            delete customData.image;
            delete customData.images;
            delete customData.created_at;
            delete customData.updated_at;
            setProductPayload(customData);
        } catch ({ response }) {
            setLoading(false);
            console.log(response);
        }
    };

    const handleChangeImage = ({ target }) => {
        const { name, files } = target;
        setImagePayload({ [name]: files[0] });
    };
    const submitImagePayload = useCallback(async () => {
        try {
            const formData = new FormData();
            formData.append("image", imagePayload.image);
            const { data } = await ProductService.AddImage(
                product.id,
                formData
            );
            fetchData();
        } catch ({ response }) {
            console.log(response);
        }
    }, [imagePayload]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        Object.keys(finalePayload).map((property) => {
            if (
                (property === "statut" &&
                    typeof finalePayload[property] === "boolean") ||
                (property === "statut" &&
                    typeof finalePayload[property] === "number")
            ) {
                return formData.append(
                    productDeserializeProperty[property],
                    finalePayload[property] ? 1 : 0
                );
            }
            if (
                (property === "recommend" &&
                    typeof finalePayload[property] === "boolean") ||
                (property === "recommend" &&
                    typeof finalePayload[property] === "number")
            ) {
                return formData.append(
                    productDeserializeProperty[property],
                    finalePayload[property] ? 1 : 0
                );
            }
            if (
                (property === "in_coming" &&
                    typeof finalePayload[property] === "boolean") ||
                (property === "in_coming" &&
                    typeof finalePayload[property] === "number")
            ) {
                return formData.append(
                    productDeserializeProperty[property],
                    finalePayload[property] ? 1 : 0
                );
            }
            return formData.append(
                productDeserializeProperty[property],
                finalePayload[property]
            );
        });
        try {
            const { data } = await ProductService.Update(
                formData,
                product.designation
            );
            setLoading(false);
            history.push("/admin/products");
            dispatch(
                Message.setMessageSuccess(
                    "Les modification on été enregistrer :)"
                )
            );
            dispatch(ProductAction.fetchProduct());
        } catch ({ response }) {
            setLoading(false);
            swal(response.data.message, {
                icon: "error",
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [designation]);

    useEffect(() => {
        if (product.hasOwnProperty("description")) {
            setEditorState(
                EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(product.description)
                    )
                )
            );
        }
        if (product.hasOwnProperty("image")) {
            setFile({ ...file, url: product.image });
        }
        if (product.hasOwnProperty("marque") && brands.length > 0) {
            setProductPayload({
                ...productPayload,
                marque: brands.filter(
                    (brand) =>
                        brand.nom.toLowerCase() === product.marque.toLowerCase()
                )[0].id,
            });
        }
        if (product.hasOwnProperty("category") && categories.length > 0) {
            setProductPayload({
                ...productPayload,
                category: categories.filter(
                    (category) =>
                        category.nom.toLowerCase() ===
                        product.category.toLowerCase()
                )[0].id,
            });
        }
    }, [product, brands, categories]);

    useEffect(() => {
        if (JSON.stringify(imagePayload) !== "{}") {
            submitImagePayload();
        }
    }, [imagePayload]);

    return (
        <form
            className="w-full px-3 mt-4 space-y-3 mx-2 flex flex-col mb-3"
            onSubmit={handleSubmit}
        >
            <Input
                type="text"
                color="deepPurple"
                size="sm"
                outline={true}
                placeholder="Designation"
                name="designation"
                value={productPayload?.designation}
                onChange={handleChange}
            />

            <Input
                type="text"
                color="deepPurple"
                size="sm"
                outline={true}
                placeholder="Model"
                value={productPayload?.model}
                name="model"
                onChange={handleChange}
            />

            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleEditor}
            />

            <Input
                type="numeric"
                color="deepPurple"
                size="sm"
                outline={true}
                placeholder="Quantite"
                name="qte_stock"
                value={productPayload?.qte_stock}
                onChange={handleChange}
            />
            <Input
                type="numeric"
                color="deepPurple"
                size="sm"
                outline={true}
                placeholder="prix"
                name="price"
                value={productPayload?.prix}
                onChange={handleChange}
            />
            <Input
                type="numeric"
                color="deepPurple"
                size="sm"
                outline={true}
                placeholder="Remise"
                name="discount"
                value={productPayload?.remise}
                onChange={handleChange}
            />
            <Input
                type="numeric"
                color="deepPurple"
                size="sm"
                outline={true}
                placeholder="Ratingts"
                name="ratings"
                value={productPayload?.note}
                onChange={handleChange}
            />
            <div className="w-full">
                <div className="inline-block relative w-full">
                    <select
                        onChange={handleChange}
                        name="category"
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option>~~Selectionnez une Categorie~~</option>
                        {categories?.map((cat) => (
                            <option
                                key={cat.id}
                                value={cat.id}
                                selected={
                                    cat.nom.toLowerCase() === product?.category
                                }
                            >
                                {cat.nom}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="inline-block relative w-full">
                    <select
                        onChange={handleChange}
                        name="brand"
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option>~~Selectionnez une marque~~</option>
                        {brands?.map((brand) => (
                            <option
                                key={brand.id}
                                value={brand.id}
                                selected={
                                    brand.nom.toLowerCase() === product?.marque
                                }
                            >
                                {brand.nom}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-full p-2 border border-gray-500 rounded-lg border-opacity-60">
                <label
                    style={{
                        backgroundImage:
                            // file?.image !== undefined &&
                            JSON.stringify(file) !== "{}" &&
                            `url(${file?.url})`,
                    }}
                    className={`flex flex-col justify-center items-center  h-52 overflow-auto w-full py-2
                 ${
                     file?.url === undefined
                         ? "bg-gray-200 hover:bg-gray-300 "
                         : "bg-contain bg-no-repeat bg-center"
                 } rounded-lg border  cursor-pointer focus:outline-none transition-all duration-150
                `}
                >
                    {file?.url === undefined && (
                        <>
                            <img src={SelectImage} alt="images_paceholder" />
                            <span className="mt-2 text-sm leading-normal text-blue-600">
                                Choisir une image
                            </span>
                        </>
                    )}
                    <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        name="featured_image"
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="w-full h-auto border border-gray-500 rounded-lg p-2 grid grid-cols-4 gap-1">
                {product?.images.map((image) => (
                    <CardImg
                        key={image.id}
                        image={image}
                        product={product.id}
                        fetchProduct={fetchData}
                    />
                ))}
                <label className="w-32 h-20 py-2 flex flex-col items-center bg-white rounded-md shadow-md tracking-wide uppercase border-2 border-dashed border-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-500 text-purple-300 ease-linear transition-all duration-150">
                    <img src={SelectImage} alt="images_paceholder" />
                    <span className="flex justify-center text-xs leading-normal lowercase">
                        Choisir des images
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        name="image"
                        onChange={handleChangeImage}
                    />
                </label>
            </div>

            <div className="mb-3">
                <div>
                    <div>
                        <label className="inline-flex items-center text-gray-500">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={productPayload?.recommend}
                                onChange={handleChange}
                                name="recommend"
                            />
                            <span className="ml-2">Recommendé</span>
                        </label>
                    </div>
                    <div>
                        <label className="inline-flex items-center text-gray-500">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={productPayload?.in_coming}
                                onChange={handleChange}
                                name="in_coming"
                            />
                            <span className="ml-2">En Arrivages</span>
                        </label>
                    </div>
                    <div>
                        <span className="text-gray-400 font-medium">
                            Non publier
                        </span>
                        <div className="relative inline-block w-14 mx-2 align-middle select-none">
                            <input
                                // onClick={(e) => setPublier(true)}
                                type="checkbox"
                                name="toggle"
                                id="Blue"
                                checked={productPayload?.statut}
                                name="status"
                                onChange={handleChange}
                                className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-10 h-6 rounded-full bg-white  appearance-none cursor-pointer"
                            />
                            <label
                                htmlFor="Blue"
                                className="block overflow-hidden h-6  rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                        </div>
                        <span className="text-gray-400 font-medium">
                            Publier
                        </span>
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="flex w-full mt-5  space-x-3 text-sm font-medium  bg-blue-500 rounded-md  text-white  justify-center items-center p-1   hover:bg-blue-600  transition duration-300 ease-in-out focus-within:outline-none py-2"
            >
                {loading && "Loading..."}
                {!loading && "Sauvegarder"}
            </button>
        </form>
    );
};

const CardImg = React.memo(({ image, product, fetchProduct }) => {
    const [show, setShow] = useState(false);

    const deleteImage = async () => {
        try {
            const { data } = await ProductService.DeleteImage(
                product,
                image.id
            );
            fetchProduct();
        } catch ({ response }) {
            console.log(response);
        }
    };

    return (
        <div
            className="w-32 h-20 rounded-md shadow-md overflow-hidden bg-cover bg-center relative"
            style={{ backgroundImage: `url(${image.url})` }}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {show && (
                <div className="flex space-x-4 bg-black bg-opacity-80 p-2 transition duration-200 left-0 top-0 bottom-0 right-0 absolute">
                    <label
                        onClick={() => deleteImage()}
                        className="text-white hover:text-gray-900 transition duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </label>
                </div>
            )}
        </div>
    );
});
