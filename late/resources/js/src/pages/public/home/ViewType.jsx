import React from "react";
import { Arrivages } from "../Special/Arrivages";
import { Meilleures } from "../Special/Meilleures";
import { Vedette } from "../Special/Vedette";

export const ViewType = ({ color }) => {
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <>
            <div className="hidden lg:flex flex-wrap justify-center items-center">
                <div className="w-2/3 ">
                    <div className="flex flex-col justify-center items-center border-b-2 border-opacity-50  border-site-600 ">
                        <ul
                            className="flex  list-none flex-wrap pt-3 pb-8 flex-row  "
                            role="tablist"
                        >
                            <li className="-mb-px  last:mr-0 flex-auto text-center ">
                                <button
                                    className={`px-5 shadow-lg  block leading-normal mx-4  justify-center items-center py-1 w-40 rounded  border-2 border-opacity-50 border-solid border-yellow-500 hover:text-white ${
                                        openTab === 1
                                            ? "text-white bg-yellow-500"
                                            : "text-yellow-500 bg-white"
                                    }  text-sm font-semibold hover:bg-yellow-500  focus-within:outline-none transition duration-500 ease-in-out`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                    }}
                                    data-toggle="tab"
                                    href="#link1"
                                    role="tablist"
                                >
                                    En vedette
                                </button>
                            </li>
                            <li className="-mb-px  last:mr-0 flex-auto text-center">
                                <button
                                    className={`px-5 shadow-lg  block leading-normal mx-4  justify-center items-center py-1 w-40 rounded  border-2 border-opacity-50 border-solid border-yellow-500 hover:text-white ${
                                        openTab === 2
                                            ? "text-white bg-yellow-500"
                                            : "text-yellow-500 bg-white"
                                    }  text-sm font-semibold hover:bg-yellow-500  focus-within:outline-none transition duration-500 ease-in-out`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    data-toggle="tab"
                                    href="#link2"
                                    role="tablist"
                                >
                                    Arrivages
                                </button>
                            </li>
                            <li className="-mb-px  last:mr-0 flex-auto text-center">
                                <button
                                    className={`px-5 shadow-lg  block leading-normal mx-4  justify-center items-center py-1 w-40 rounded  border-2 border-opacity-50 border-solid border-yellow-500 hover:text-white ${
                                        openTab === 3
                                            ? "text-white bg-yellow-500"
                                            : "text-yellow-500 bg-white"
                                    }  text-sm font-semibold hover:bg-yellow-500 focus-within:outline-none transition duration-500 ease-in-out`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(3);
                                    }}
                                    data-toggle="tab"
                                    href="#link3"
                                    role="tablist"
                                >
                                    Plus Vendues
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="break-words bg-white w-full mb-6 ">
                        <div className="py-10 ">
                            <div className="tab-content tab-space">
                                <div
                                    className={
                                        openTab === 1 ? "block" : "hidden"
                                    }
                                    id="link1"
                                >
                                    <div>
                                        <Vedette />
                                    </div>
                                </div>
                                <div
                                    className={
                                        openTab === 2 ? "block" : "hidden"
                                    }
                                    id="link2"
                                >
                                    <div>
                                        <Arrivages />
                                    </div>
                                </div>
                                <div
                                    className={
                                        openTab === 3 ? "block" : "hidden"
                                    }
                                    id="link3"
                                >
                                    <div>
                                        <Meilleures />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:hidden   justify-center items-center z-0 relative">
                <div className="w-full ">
                    <div className="flex flex-col justify-center items-center border-b-2 border-opacity-50  border-site-600 ">
                        <ul
                            className="flex  list-none  pt-3 pb-8 flex-row  "
                            role="tablist"
                        >
                            <li className="-mb-px  last:mr-0 flex-auto text-center ">
                                <button
                                    className={` shadow-lg  block leading-normal mx-2  justify-center items-center py-1 w-24 rounded  border-2 border-opacity-50 border-solid border-yellow-500 hover:text-white ${
                                        openTab === 1
                                            ? "text-white bg-yellow-500"
                                            : "text-yellow-500 bg-white"
                                    }  text-sm font-semibold hover:bg-yellow-500  focus-within:outline-none transition duration-500 ease-in-out`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                    }}
                                    data-toggle="tab"
                                    href="#link1"
                                    role="tablist"
                                >
                                    En vedette
                                </button>
                            </li>
                            <li className="-mb-px  last:mr-0 flex-auto text-center">
                                <button
                                    className={` shadow-lg  block leading-normal mx-2  justify-center items-center py-1 w-24 rounded  border-2 border-opacity-50 border-solid border-yellow-500 hover:text-white ${
                                        openTab === 2
                                            ? "text-white bg-yellow-500"
                                            : "text-yellow-500 bg-white"
                                    }  text-sm font-semibold hover:bg-yellow-500  focus-within:outline-none transition duration-500 ease-in-out`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    data-toggle="tab"
                                    href="#link2"
                                    role="tablist"
                                >
                                    Arrivages
                                </button>
                            </li>
                            <li className="-mb-px  last:mr-0 flex-auto text-center">
                                <button
                                    className={` shadow-lg  block leading-normal mx-2  justify-center items-center py-1 w-24 rounded  border-2 border-opacity-50 border-solid border-yellow-500 hover:text-white ${
                                        openTab === 3
                                            ? "text-white bg-yellow-500"
                                            : "text-yellow-500 bg-white"
                                    }  text-sm font-semibold hover:bg-yellow-500 focus-within:outline-none transition duration-500 ease-in-out`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpenTab(3);
                                    }}
                                    data-toggle="tab"
                                    href="#link3"
                                    role="tablist"
                                >
                                    + Vendues
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="break-words bg-white w-full mb-6 ">
                        <div className="py-10 ">
                            <div className="tab-content tab-space">
                                <div
                                    className={
                                        openTab === 1 ? "block" : "hidden"
                                    }
                                    id="link1"
                                >
                                    <div>
                                        <Vedette />
                                    </div>
                                </div>
                                <div
                                    className={
                                        openTab === 2 ? "block" : "hidden"
                                    }
                                    id="link2"
                                >
                                    <div>
                                        <Arrivages />
                                    </div>
                                </div>
                                <div
                                    className={
                                        openTab === 3 ? "block" : "hidden"
                                    }
                                    id="link3"
                                >
                                    <div>
                                        <Meilleures />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ViewType;
