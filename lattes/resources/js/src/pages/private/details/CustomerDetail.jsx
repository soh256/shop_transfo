import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Customer from "../../../Services/Customer";
import ThreeDots from "../../../components/loader/ThreeDots";
import ListLoader from "../../../components/loader/ListLoader";
import { Box } from "../../../components/partials/svg";

export const CustomerDetail = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async (id) => {
        try {
            const { data } = await Customer.Get(id);
            setCustomer(data);
            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        fetchData(id);
    }, []);

    return (
        <>
            <div className="flex space-x-4">
                <div className="bg-white w-2/5 h-full rounded-sm shadow-sm p-4">
                    {/* header */}
                    <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2">
                        <div className="text-lg font-bold text-indigo-400">
                            User Infomations
                        </div>
                        <svg
                            className="flex-shrink-0 h-6 w-6 mr-3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className="fill-current text-indigo-500"
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                            />
                            <path
                                className="fill-current  text-indigo-300"
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                            />
                        </svg>
                    </div>
                    {/* data */}
                    {!loading && (
                        <div className="text-gray-400">
                            <div className="flex items-center mt-3 px-10 justify-start">
                                <label className="w-1/5">Nom :</label>
                                <div className="w-4/5">{customer.nom}</div>
                            </div>

                            <div className="flex items-center mt-3 px-10 justify-start">
                                <label className="w-1/5">Prenom :</label>
                                <div className="w-4/5">{customer.prenom}</div>
                            </div>

                            <div className="flex items-center mt-3 px-10 justify-start">
                                <label className="w-1/5">Sexe :</label>
                                <div className="w-4/5">
                                    <span className="bg-green-500 text-white px-4 py-1 uppercase rounded-md">
                                        {customer.sexe}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center mt-3 px-10 justify-start">
                                <label className="w-1/5">email :</label>
                                <div className="w-4/5">{customer.email}</div>
                            </div>
                            <div className="flex items-center mt-3 px-10 justify-start">
                                <label className="w-1/5">Telephone :</label>
                                <div className="w-4/5">{customer.tel}</div>
                            </div>
                            <div className="flex items-center mt-3 px-10 justify-start">
                                <label className="w-1/5 uppercase">CNI :</label>
                                <div className="w-4/5">
                                    <span className="bg-green-500 text-white px-4 py-1 uppercase rounded-md">
                                        {customer.cni}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center mt-3 px-10 justify-start">
                                <label className="w-1/5 uppercase">
                                    Role :
                                </label>
                                <div className="w-4/5">
                                    <span className="bg-indigo-500 text-white px-3 py-1 uppercase rounded-md">
                                        {customer.role.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    {loading && <ListLoader />}
                </div>
                <div className="bg-white w-3/5 h-auto rounded-sm shadow-sm p-4 ">
                    <div className="flex justify-between items-center border-b-2 border-gray-100 pb-2">
                        <div className="text-lg font-bold text-indigo-400">
                            User Orders
                        </div>
                        <svg
                            className="flex-shrink-0 h-6 w-6 mr-3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className={`fill-current text-indigo-300`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                            />
                            <path
                                className={`fill-current text-indigo-600`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                            />
                            <path
                                className={`fill-current text-indigo-500
                                `}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                            />
                        </svg>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        {loading && <ThreeDots />}
                        {typeof customer.orders !== "undefined" &&
                            !loading &&
                            customer.orders.length === 0 && <Box />}
                    </div>
                </div>
            </div>
        </>
    );
};
