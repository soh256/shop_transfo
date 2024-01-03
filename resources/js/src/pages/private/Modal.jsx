import React, { useEffect, useState } from "react";
import Input from "@material-tailwind/react/Input";
import { useDropzone } from "react-dropzone";
import CategoryService from "../../Services/Category.service";
import BrandService from "../../Services/Brand.service";
import { useDispatch } from "react-redux";
import Message from "../../redux/actions/message/Message";
import SelectImage from "../../assets/images/SelectImage.png";
import Category from "../../redux/actions/category/Category";

const operation = { category: CategoryService, brand: BrandService };
export const Modal = React.memo(
    ({
        showModal,
        setShowModal,
        title,
        type,
        loading,
        setLoading,
        editing,
        setEditing,
    }) => {
        const [brand, setBrand] = useState({});
        const [category, setCategory] = useState({});
        const [updatePayload, setUpdatePayload] = useState({});
        // const [loading, setLoading] = useState(false);
        const dispatch = useDispatch();

        // model={category:{}, brand:{}}
        const handleChange = ({ target }) => {
            const { name, files, value } = target;

            switch (type) {
                case "category":
                    if (name === "image") {
                        setCategory({ ...category, [name]: files[0] });
                        setUpdatePayload({
                            ...updatePayload,
                            [name]: files[0],
                        });
                    } else {
                        setCategory({ ...category, [name]: value });
                        setUpdatePayload({ ...updatePayload, [name]: value });
                    }
                    break;

                case "brand":
                    if (name === "image") {
                        setBrand({ ...brand, logo: files[0] });
                        setUpdatePayload({ ...updatePayload, logo: files[0] });
                    } else {
                        setBrand({ ...brand, [name]: value });
                        setUpdatePayload({ ...updatePayload, [name]: value });
                    }
                    break;
            }
        };
        const state = {
            category: category,
            brand: brand,
        };
        const field = {
            category: "image",
            brand: "logo",
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const formData = new FormData();
            if (editing.status !== true) {
                if (JSON.stringify(brand) !== "{}") {
                    formData.append("name", brand.name);
                    formData.append("logo", brand.logo);
                }
                if (JSON.stringify(category) !== "{}") {
                    formData.append("name", category.name);
                    formData.append("image", category.image);
                }
                try {
                    const { data } = await operation[type].Add(formData);
                    dispatch(Message.setMessageSuccess(`${data.message} :)`));
                    setShowModal(false);
                    if (type === "category") {
                        dispatch(Category.fetchCategory());
                    }
                    setLoading(false);
                } catch ({ response }) {
                    const { data: errors } = response.data;
                    let errorMessage = [];
                    errors.name?.map((error) => errorMessage.push(error));
                    errors.image?.map((error) => errorMessage.push(error));
                    dispatch(Message.setMessageError(errorMessage.toString()));
                    setLoading(false);
                }
                setEditing({
                    status: false,
                    data: {},
                });
            } else {
                if (JSON.stringify(updatePayload) !== "{}") {
                    Object.keys(updatePayload).map((key) =>
                        formData.append(key, updatePayload[key])
                    );
                }

                try {
                    const { data } = await operation[type].Update(
                        editing.data.id,
                        formData
                    );
                    dispatch(Message.setMessageSuccess(`${data.message} :)`));
                    setShowModal(false);
                    if (type === "category") {
                        dispatch(Category.fetchCategory());
                    }
                    setLoading(false);
                } catch ({ response }) {
                    const { data: errors } = response.data;
                    let errorMessage = [];
                    errors.name?.map((error) => errorMessage.push(error));
                    errors.image?.map((error) => errorMessage.push(error));
                    dispatch(Message.setMessageError(errorMessage.toString()));
                    setLoading(false);
                }
            }
        };

        useEffect(() => {
            if (editing !== "undefined" && editing.status === true) {
                type === "category" &&
                    setCategory({
                        name: editing.data.name,
                        image: editing.data.image,
                    });
                type === "brand" &&
                    setBrand({
                        name: editing.data.name,
                        logo: editing.data.image,
                    });
                console.log("set");
            } else {
                setCategory({});
                setBrand({});
                console.log("clean");
            }
        }, [editing]);

        return (
            <>
                {showModal && (
                    <>
                        {/*content*/}
                        <div className="border-2 border-blue-800 rounded shadow-lg absolute flex flex-col w-11/12 bg-white outline-none focus:outline-none ml-2 ">
                            {/*header*/}
                            <div className="flex items-center justify-between p-2 border-b border-solid border-blueGray-200 rounded-t bg-blue-800">
                                <h3 className="text-sm font-semibold text-white">
                                    {title}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditing({
                                            status: false,
                                            data: {},
                                        });
                                    }}
                                    className="text-white border-2 border-white p-2 h-5 w-5 text-sm rounded-full focus:outline-none flex items-center justify-center"
                                >
                                    <span>x</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {/*body*/}
                                <div className="relative p-6 flex space-y-3 flex-col h-auto">
                                    <Input
                                        type="text"
                                        color="indigo"
                                        size="regular"
                                        outline={true}
                                        placeholder="Nom"
                                        value={state[type].name}
                                        name="name"
                                        onChange={handleChange}
                                    />
                                    <div className=" h-auto">
                                        <label className="w-full  h-auto py-2 flex flex-col items-center bg-white rounded-md shadow-md tracking-wide uppercase border-2 border-dashed border-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-500 text-purple-300 ease-linear transition-all duration-150">
                                            {state[type][field[type]] !==
                                                undefined &&
                                                state[type][field[type]] !==
                                                    null && (
                                                    <img
                                                        src={
                                                            typeof state[type][
                                                                field[type]
                                                            ] === "string"
                                                                ? state[type][
                                                                      field[
                                                                          type
                                                                      ]
                                                                  ]
                                                                : URL.createObjectURL(
                                                                      state[
                                                                          type
                                                                      ][
                                                                          field[
                                                                              type
                                                                          ]
                                                                      ]
                                                                  )
                                                        }
                                                        className="h-20"
                                                    />
                                                )}
                                            {typeof state[type][field[type]] ===
                                                "undefined" && (
                                                <>
                                                    <img
                                                        src={SelectImage}
                                                        alt="images_paceholder"
                                                    />
                                                    <span className="mt-2 text-xs leading-normal">
                                                        Select Image
                                                    </span>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".jpg,.jpeg,.png"
                                                name="image"
                                                onChange={handleChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-2 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        disable={loading.toString()}
                                        className="bg-blue-200 hover:bg-blue-300  w-full active:bg-blue-700 font-medium  text-sm px-2 py-2 rounded  hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 text-white"
                                        type="submit"
                                    >
                                        {loading && "loading..."}
                                        {!loading && "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </>
        );
    }
);
