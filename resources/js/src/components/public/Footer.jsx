import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { ImYoutube2 } from "react-icons/im";
import { useSelector } from "react-redux";

export const Footer = () => {
  const categories = useSelector((state) => state.categories.data);
  const loading = useSelector((state) => state.categories.loading);

  return (
    <footer className="bg-gray-100 pt-5 w-full ">
      <div className="pt-2 flex justify-center  ">
        <div className="w-2/3 flex justify-items-stretch ">
          <div className="lg:flex w-full justify-items-stretch border-b  border-gray-500 ">
            <div className="w-full lg:w-3/5 mb-10 lg:mb-0 flex lg:justify-items-stretch  ">
              <div className="w-full   justify-items-stretch ">
                <ul className="w-full">
                  <label className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800 mb-8 uppercase">
                    Categories
                  </label>
                  {loading && (
                    <li className="mt-2">
                      <Link
                        to="#0"
                        className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                      >
                        Loading...
                      </Link>
                    </li>
                  )}
                  {!loading &&
                    categories.slice(0, 6).map((category) => (
                      <li key={category.id} className="mt-2">
                        <Link
                          to={`/categorie/${category.nom}`}
                          className="text-sm lg:text-sm leading-none capitalize hover:text-brand  text-gray-800  "
                        >
                          {category.nom}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="w-full pl-24 justify-items-stretch">
                <ul className="w-full">
                  <label className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800 mb-8 uppercase">
                    Comptes
                  </label>
                  <li className="mt-2">
                    <Link
                      to="/account/register"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Comptes
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      to="/account/login"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Connexion
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      to="/account"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Mon compte
                    </Link>
                  </li>{" "}
                  <li className="mt-2">
                    <Link
                      to="/password/reset"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Mot de passe
                    </Link>
                  </li>
                </ul>
              </div>{" "}
            </div>
            <div className="w-full lg:w-full mb-10 lg:mb-0 lg:pl-10 flex justify-items-start lg:justify-self-end space-x-6 ">
              <div className=" lg:px-14 justify-items-stretch">
                <ul>
                  <label className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800 mb-8 uppercase">
                    Aide
                  </label>
                  <li className="mt-2">
                    <a
                      href="https://transfoafricainc.com"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Contacter Nous
                    </a>
                  </li>
                  <li className="mt-2">
                    <Link
                      to="/checkout"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Mode de payement
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      to="/account"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Commandes
                    </Link>
                  </li>{" "}
                  <li className="mt-2">
                    <Link
                      to="#0"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Discutions
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full 2xl:pl-24   justify-items-stretch">
                <ul>
                  <label className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800 mb-8 uppercase">
                    Entreprise
                  </label>
                  <li className="mt-2">
                    <a
                      href="https://transfoafricainc.com"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      A propos de nous
                    </a>
                  </li>{" "}
                  <li className="mt-2">
                    <a
                      href="https://transfoafricainc.com"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Police de confidentialité
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="https://transfoafricainc.com"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Termes des Services
                    </a>
                  </li>{" "}
                  <li className="mt-2">
                    <a
                      href="https://transfoafricainc.com"
                      className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800  "
                    >
                      Yde-Cmr N.R.Omnisport
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/5 flex ">
              <div className="w-full lg:w-1/2 px-6 flex flex-col items-center lg:items-end ">
                <label className="text-sm lg:text-sm leading-none hover:text-brand  text-gray-800 mb-8 uppercase">
                  Suivez Nous sur
                </label>
                <div className="flex items-center mt-2 ml-2 mb-6">
                  <Link to="#0">
                    <div className="text-gray-800    cursor-pointer hover:text-brand  ">
                      <BsWhatsapp className="w-5 h-5 text-green-500" />
                    </div>
                  </Link>

                  <Link to="#0">
                    <div className="pl-4">
                      <FaFacebookF className="w-5 h-5 text-blue-700" />
                    </div>
                  </Link>
                </div>{" "}
                <div className="flex items-center mt-2 mb-6">
                  <Link to="#0">
                    <div className="text-gray-800   cursor-pointer hover:text-brand  ">
                      {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-gray-700"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                />
                                            </svg> */}
                      <ImYoutube2 className="w-10 h-10 text-red-700" />
                    </div>
                  </Link>

                  <a href=" tel: 00237698439734">
                    <div className="pl-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                  </a>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-10  ">
        <div className="flex flex-col justify-center space-y-4 lg:space-y-0 ">
          <p className=" text-sm lg:text-sm leading-none text-gray-900  ">
            © 2022 Transfo Africa Int. All rights reserved.
          </p>{" "}
        </div>
      </div>
    </footer>
  );
};
