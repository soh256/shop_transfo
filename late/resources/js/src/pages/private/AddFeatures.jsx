import React, { Fragment, useRef, useState } from "react";
import Input from "@material-tailwind/react/Input";
import { useDropzone } from "react-dropzone";
import SelectImage from "../../assets/images/SelectImage.png";
import { useDispatch } from "react-redux";
import Message from "../../redux/actions/message/Message";
import FeatureService from "../../Services/Feature.service";
import { useHistory } from "react-router";

export const AddFeatures = () => {
    const [file, setFile] = useState([]);
    const [feature, setFeature] = useState({ show_header: false });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = ({ target }) => {
        const { name, value, files } = target;
        if (name === "image") {
            setFeature({ ...feature, image: files[0] });
        } else if (name === "show_header" || name === "status") {
            setFeature({ ...feature, [name]: !feature[name] });
        } else {
            setFeature({ ...feature, [name]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const key = ["url", "image", "status", "show_header"];

        let allDataFilled = true;
        key.some((k) => {
            if (feature[k] === undefined) {
                allDataFilled = false;
                setLoading(false);
                return dispatch(
                    Message.setMessageError("Please fill all data form")
                );
            }
        });

        const formData = new FormData();

        key.map((k) => {
            if (
                (k === "status" && typeof feature[k] === "boolean") ||
                (k === "status" && typeof feature[k] === "number")
            ) {
                return formData.append(k, feature[k] ? 1 : 0);
            }
            if (
                (k === "show_header" && typeof feature[k] === "boolean") ||
                (k === "show_header" && typeof feature[k] === "number")
            ) {
                return formData.append(k, feature[k] ? 1 : 0);
            }
            return formData.append(k, feature[k]);
        });

        if (allDataFilled) {
            try {
                const { data } = await FeatureService.Add(formData);
                dispatch(Message.setMessageSuccess(data.message));
                setFeature({});
                setLoading(false);
                history.push("/admin/features");
            } catch ({ response }) {
                dispatch(Message.setMessageError(response.data.message));
                setLoading(false);
            }
        } else {
            return dispatch(
                Message.setMessageError("Please fill all data form")
            );
        }
    };
    return (
        <div className="bg-white w-full shadow-md rounded-md py-10 ">
            <div className="h-10 border-b border-gray-400 border-opacity-50 flex flex-col justify-center items-center ">
                <label className="text-gray-500 ml-2 flex ">
                    Ajouter une pub
                </label>
            </div>
            <form className=" flex mt-4 space-x-2 mx-2" onSubmit={handleSubmit}>
                <div className="w-full px-3 space-y-3 flex flex-col">
                    <Input
                        type="url"
                        color="deepPurple"
                        size="sm"
                        outline={true}
                        name="url"
                        placeholder="URL"
                        onChange={handleChange}
                    />
                    <div className="w-full p-2 border border-gray-500 rounded-lg border-opacity-60">
                        <label
                            style={{
                                backgroundImage:
                                    feature.image !== undefined &&
                                    JSON.stringify(feature) !== "{}" &&
                                    `url(${URL.createObjectURL(
                                        feature?.image
                                    )})`,
                            }}
                            // style={{ "background-image": `url(${thumbnail})` }}
                            className={`flex flex-col justify-center items-center  h-52 overflow-auto w-full py-2 ${
                                feature.image === undefined
                                    ? "bg-gray-200 hover:bg-gray-300 "
                                    : "bg-contain bg-no-repeat bg-center"
                            } rounded-lg border  cursor-pointer focus:outline-none transition-all duration-150`}
                        >
                            {feature.image === undefined && (
                                <>
                                    <img
                                        src={SelectImage}
                                        alt="images_paceholder"
                                    />
                                    <span className="mt-2 text-xs leading-normal">
                                        Selectionner l'image
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
                            {/* </label> */}
                        </label>
                    </div>
                    <div className="mb-3">
                        <div>
                            <span className="text-gray-400 font-medium">
                                Non publier
                            </span>
                            <div className="relative inline-block w-14 mx-2 align-middle select-none">
                                <input
                                    onChange={handleChange}
                                    type="checkbox"
                                    name="status"
                                    id="Blue"
                                    value={feature?.status}
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
                        <label className="inline-flex items-center text-gray-500 mt-2">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={
                                    feature.show_header === undefined
                                        ? false
                                        : feature?.show_header
                                }
                                onChange={handleChange}
                                name="show_header"
                            />
                            <span className="ml-2">In header</span>
                        </label>
                    </div>
                    <button
                        disabled={JSON.stringify(feature) === "{}"}
                        type="submit"
                        className="flex w-full my-5  space-x-3 text-sm font-medium bg-blue-600 rounded-md  text-white  justify-center items-center p-1   hover:bg-blue-800  transition duration-300 ease-in-out focus-within:outline-none py-2 "
                    >
                        {loading && "Loading..."}
                        {!loading && "Enregistrez"}
                    </button>
                </div>
            </form>
        </div>
    );
};
