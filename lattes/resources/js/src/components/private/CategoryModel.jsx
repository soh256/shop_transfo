import React, { useState } from "react";
import BrandService from "../../Services/Brand.service";
import CategoryService from "../../Services/Category.service";
import Message from "../../redux/actions/message/Message";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../redux/actions/category/Category"

const operation = {
    category: CategoryService,
    brand: BrandService,
};

export const CategoryModel = React.memo(
    ({ id, img, name, type, setLoading, setShowModal, setEditing }) => {
        const dispatch = useDispatch();
        const [show, setShow] = useState(false);

        const handleDelete = async () => {
            try {
                const { data } = await operation[type].Delete(id);
                if(type === "category"){
                    dispatch(Category.fetchCategory())
                }else{
                    setLoading(true);
                }
                dispatch(
                    Message.setMessageSuccess(`${type} suprimer avec succes :)`)
                );
            } catch ({ response }) {
                dispatch(
                    Message.setMessageSuccess(response.data.message + " :(")
                );
            }
        };
        return (
            <div
                className="  bg-indigo-800 bg-opacity-60 w-11/12 h-20 self-auto ml-2 rounded-lg shadow-md overflow-hidden flex flex-col justify-center  items-center bg-cover bg-center relative"
                style={{ backgroundImage: `url(${img})` }}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                <p className=" text-gray-100 shadow-md flex  text-sm font-semibold uppercase">
                    {name}
                </p>
                {show && (
                    <div className="bg-black  space-x-5 bg-opacity-80 p-2 transition duration-200 left-0 top-0 bottom-0 right-0 absolute flex justify-center items-center ">
                        <label
                            onClick={() => {
                                setShowModal(true)
                                setEditing({
                                    status: true,
                                    data:{
                                        id: id,
                                        image: img,
                                        name: name
                                    }
                                })
                            }}
                            className=" cursor-pointer text-white hover:text-gray-500 transition duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </label>
                        <span
                            onClick={handleDelete}
                            className="text-white hover:text-gray-500 transition duration-200 "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5  cursor-pointer"
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
                        </span>
                    </div>
                )}
            </div>
        );
    }
);
