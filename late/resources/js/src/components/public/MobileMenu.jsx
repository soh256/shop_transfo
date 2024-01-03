import React, { useState, useEffect } from "react";
import { Dropup } from "./Dropup";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryService from "../../Services/Category.service";

const namecat = "Categories";
const names = "Services";
const Services = [
    {
        nom: <a href="https://transfoafricainc.com ">conception logiciels</a>,
        img: (
            <>
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
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                </svg>
            </>
        ),
    },
    {
        nom: <a href="https://transfoafricainc.com">Audit des SI</a>,
        img: (
            <>
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
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </>
        ),
    },
    {
        nom: <a href="https://transfoafricainc.com">Securité Informatique</a>,
        img: (
            <>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
            </>
        ),
    },
    {
        nom: <a href="https://transfoafricainc.com">Genie-civil</a>,
        img: (
            <>
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
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                </svg>
            </>
        ),
    },
    {
        nom: <a href="https://transfoafricainc.com">Formations</a>,
        img: (
            <>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
            </>
        ),
    },
];
const img = (
    <>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
        </svg>
    </>
);
const imgs = (
    <>
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
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
        </svg>
    </>
);

export const MobileMenu = () => {
    const categories = useSelector((state) => state.categories.data);
    const loading = useSelector((state) => state.categories.loading);

    const color = "blue-600";

    const contentCat = (
        <>
            {categories.map((cat) => (
                <Link
                    key={cat.id}
                    to={`/categorie/${cat.nom}`}
                    exact="false"
                    className={
                        "text-sm px-4 font-normal capitalize  bg-transparent hover:bg-blue-900 focus:bg-blue-900 py-2  flex justify-between  items-center transition duration-200 ease-in-out  transform hover:-translate-y-1 hover:scale-y-100" +
                        (color === "white"
                            ? " text-blueGray-700"
                            : "text-white")
                    }
                >
                    {cat.nom}{" "}
                    <img
                        src={cat.image}
                        alt={cat.nom}
                        imag={img}
                        className="w-8 h-5 "
                    />
                </Link>
            ))}
        </>
    );
    const contentS = (
        <>
            {Services.map((src, i) => (
                <a
                    key={i}
                    href="#"
                    className={
                        "text-sm px-4 font-normal capitalize  bg-transparent hover:bg-blue-900 focus:bg-blue-900 py-2  flex justify-between  items-center transition duration-200 ease-in-out  transform hover:-translate-y-1 hover:scale-y-100" +
                        (color === "white"
                            ? " text-blueGray-700"
                            : "text-white")
                    }
                >
                    <span> {src.nom} </span>
                    <span> {src.img} </span>
                </a>
            ))}
        </>
    );

    return (
        <div className="h-12 bg-blue-600 flex justify-center items-center space-x-10 py-2  opacity-80 z-50  ">
            <Link
                to="/"
                exact="true"
                className="text-white flex flex-col items-center focus:text-blue-900 transform transition ease-in scale-y-50 "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-8"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-sm text-white font-medium   ">
                    Acceuil
                </span>
            </Link>
            <div className=" h-auto text-white flex flex-col items-center opacity-100">
                <Dropup name={namecat} content={contentCat} imag={img} />
            </div>
            <div className=" text-white flex flex-col items-center opacity-100">
                <Dropup name={names} content={contentS} imag={imgs} />
            </div>

            <Link className=" text-white flex flex-col items-center" to="#0">
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
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <label className="text-sm text-white font-medium">Aide</label>
            </Link>
        </div>
    );
};
