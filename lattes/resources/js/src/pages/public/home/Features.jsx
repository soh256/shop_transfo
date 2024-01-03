import React from "react";
// import BiSupport from "react-icons/bi";
// import SiMicrostrategy from "react-icons/si";
// import AiFillSecurityScan from "react-icons/ai";

const Features = () => {
    return (
        <section className="flex justify-center items-center ">
            <div className="bg-white   w-full  lg:hidden">
                <div className="container px-2 py-8 mx-autow-2/3 ">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col justify-center items-center    ">
                            <div className="bg-gray-100 rounded-full p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-green-500  "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <h1 className="mt-4 text-sm font-semibold text-gray-800 dark:text-white">
                                Service Client
                            </h1>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm ">
                                Un centre d'aide permanent disponible pour vous
                                en permanence et toujours prêt a répondre a vos
                                préocupations, même les plus banales.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>

                            <h1 className="mt-4 text-sm font-semibold text-gray-800 dark:text-white">
                                Stratégie Créative
                            </h1>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                                Nous élaborons les stratégies des plus
                                créatives, afin de mettre à votre disposition
                                des produits et services fiables à la hauteur de
                                vos idées.
                            </p>
                        </div>{" "}
                        <div className="flex flex-col justify-center items-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h1 className="mt-4 text-sm font-semibold text-gray-800 dark:text-white">
                                Haute sécurité
                            </h1>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm ">
                                La securité et la confidentialité de vos donnes
                                (Personelles, des produits,des transactions
                                ...),nous en faisons notre Leitmotive.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white hidden  lg:flex w-2/3 z-0 relative">
                <div className="container px-2 py-8 mx-autow-2/3 ">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col justify-center items-center    ">
                            <div className="bg-gray-100 rounded-full p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-green-500  "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <h1 className="mt-4 text-sm font-semibold text-gray-800 dark:text-white">
                                Service Client
                            </h1>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm ">
                                Un centre d'aide permanent disponible pour vous
                                en permanence et toujours pret a repondre a vos
                                preocupations, memes les plus banales.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>

                            <h1 className="mt-4 text-sm font-semibold text-gray-800 dark:text-white">
                                Strategie Creative
                            </h1>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                                Nous élaborons les strategies des plus
                                creatives, afin de mettre à votre disposition
                                des produits et services fiables à la hauteur de
                                vos idées.
                            </p>
                        </div>{" "}
                        <div className="flex flex-col justify-center items-center">
                            <div className="bg-gray-100 rounded-full p-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h1 className="mt-4 text-sm font-semibold text-gray-800 dark:text-white">
                                Haute sécurité
                            </h1>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm ">
                                La securité et la confidentialité de vos donnees
                                (Personelles, des produits,des transactions
                                ...),nous en faisons notre Leitmotive.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Features;
