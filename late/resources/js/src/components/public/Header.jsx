import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiTwitter } from "react-icons/fi";
import { GrInstagram } from "react-icons/gr";
import { AiFillFacebook } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { Profile } from "../partials/Profile";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";
import Auth from "../../redux/actions/auth/Auth";
import { NavLink, useLocation } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { Menu, Transition } from "@headlessui/react";
import ReactDOM from "react-dom";
import SearchInput from "./Searchbar/SearchInput";
import logo from "../../assets/images/logo.png";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const filterIt = (terms, arr) => {
  if ("" === terms || terms.length < 0) return arr;
  // else if (terms.length === 0) return null;
  const words = terms.match(/\w+|"[^"]+"/g);

  words.push(terms);
  return arr.filter((a) => {
    const v = Object.values(a);
    const f = JSON.stringify(v).toLowerCase();

    return words.every((val) => f.includes(val));
  });
};

const Header = ({ cart, logout, isLoggedIn, categories, products, color }) => {
  const [inputsearch, setInputsearch] = useState("");
  // dropdown
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");
  //   end dropdown

  // more view
  const [currentView, setCurrentView] = useState(0);
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);

  const perView = 8;
  const viewData = currentView * perView;
  const ViewCount = Math.ceil(categories.length / perView);
  const sliceData = categories.slice(viewData, viewData + perView);
  const changeview = () => {
    setCurrentView((prev) => prev < ViewCount && prev + 1);
  };
  // console.log(viewData);

  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/").slice(-1)[0] !== "";

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const length = cart.length;
    setCartCount(length);
  }, [cart, cartCount]);

  // const listenerInputSearch = document.querySelector("#search");
  const handleClick = () => {
    logout();
    window.location.reload();
    // return <Redirect to="/account/login" />;
  };

  useEffect(() => {
    if (inputsearch !== "") {
      setResultData(filterIt(inputsearch, products));
    } else {
      setResultData([]);
    }
  }, [inputsearch]);

  return (
    <>
      <LazyLoadComponent>
        <nav className=" hidden lg:block md:h-auto bg-white sticky top-0 w-full z-50 shadow-sm  ">
          {/* pre-header */}
          <div className="bg-blue-550 flex justify-center items-center shadow-md ">
            <div className=" w-2/3 flex justify-between py-2 ">
              <div className=" flex justify-start space-x-3 text-gray-100">
                <div className=" ">
                  <Link to="#0">
                    <FiTwitter />
                  </Link>
                </div>

                <div className="">
                  <Link to="#0">
                    <GrInstagram />
                  </Link>
                </div>

                <div className="">
                  <Link to="#0">
                    <AiFillFacebook />
                  </Link>
                </div>
              </div>

              <div className=" flex justify-end space-x-3 text-gray-50 text-xs  ">
                <Link to="#0"> Besoin d'aide?</Link>
                {!isLoggedIn && (
                  <>
                    <Link to="/account/register">Créer votre compte</Link>
                    <span>|</span>
                    <Link to="/account/login">Connectez vous</Link>
                  </>
                )}
                {isLoggedIn && (
                  <button
                    className="focus-within:outline-none"
                    onClick={handleClick}
                  >
                    Déconnexion
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* fin pre-header */}

          {/* header */}
          <div className="bg-white flex justify-center items-center ">
            {/* seach */}
            <div className="w-2/3 flex justify-between items-center py-2 my-2 mx-2 ">
              <Link to="/" className="flex">
                <LazyLoadImage
                  effect="blur"
                  src={logo}
                  alt="logo transfo"
                  className="w-20 h-16"
                />
                <Link
                  to="/"
                  className=" flex flex-col text-xl font-bold -space-y-1 justify-center pt-2"
                >
                  <span className="text-yellow-500  ">Shop</span>
                  <span className="text-blue-700  pb-1">Transfo</span>
                </Link>
              </Link>
              <div className="  w-10/12 flex items-center justify-end ">
                <SearchInput />
              </div>

              {/* fin seach */}

              {/* debut profil */}
              <div className="flex space-x-2 justify-center items-center ml-4">
                <Link
                  to="/cart"
                  exact="true"
                  className="focus-within:outline-none w-8 h-8 rounded-full inline-flex justify-center items-center text-gray-500 bg-gray-100 relative"
                >
                  <div>
                    <FaShoppingCart />
                  </div>
                  <span className="absolute text-light text-xs text-center text-white bg-green-500 h-4 w-4 rounded-full -top-1 -right-1">
                    {cartCount}
                  </span>
                </Link>
                {isLoggedIn && (
                  <div className="mt-1">
                    <Profile />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* fin header */}
          {page && (
            <div className="w-full py-2 bg-blue-500 flex justify-center items-center">
              <div className="space-x-3  w-2/3 rounded relative">
                <Link
                  to="/"
                  exact="false"
                  className="text-white text-sm focus-within:outline-none w-auto h-auto uppercase  font-medium tracking-wider  "
                >
                  Acceuil
                </Link>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="focus-within:outline-none w-auto h-auto uppercase  font-medium tracking-wider ">
                    <div className="text-white text-sm ">Categories</div>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute align-middle-0  mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className=" py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              {categories.slice(0, 8).map((cat) => (
                                <Link
                                  key={cat.id}
                                  to={`/categorie/${cat.nom}`}
                                  exact="false"
                                  className={`${
                                    active
                                      ? "bg-bleu-500 text-white"
                                      : "text-gray-900"
                                  }  flex  w-40
                                                             py-2 px-2 text-sm justify-between  hover:bg-gray-200 capitalize break-all`}
                                >
                                  {cat.nom}{" "}
                                  <img
                                    src={cat.image}
                                    alt={cat.nom}
                                    className="w-5 h-5 "
                                  />
                                </Link>
                              ))}
                            </>
                          )}
                        </Menu.Item>
                      </div>{" "}
                    </Menu.Items>
                  </Transition>
                </Menu>
                <a
                  href="http://transfoafricainc.com"
                  className="text-white text-sm focus-within:outline-none w-auto h-auto uppercase  font-medium tracking-wider "
                >
                  Services
                </a>{" "}
                {/* <Link
                            to="#"
                            exact="false"
                            className="text-white text-sm focus-within:outline-none w-auto h-auto"
                        >
                            Devenir partenaire
                        </Link>{" "} */}
                <a
                  href="http://transfoafricainc.com"
                  className="text-white text-sm focus-within:outline-none w-auto h-auto uppercase  font-medium tracking-wider "
                >
                  Centre d'aide
                </a>{" "}
                <a
                  href="http://transfoafricainc.com"
                  className="text-white text-sm focus-within:outline-none w-auto h-auto uppercase font-medium tracking-wider "
                >
                  A propos de Nous
                </a>
              </div>
            </div>
          )}
        </nav>{" "}
        {/* responsive design */}
        <nav className="  lg:hidden md:h-auto bg-white absolute w-full   shadow-sm z-50  ">
          {/* pre-header */}
          <div className="bg-blue-550 flex justify-center items-center shadow-md px-2">
            <div className=" w-full flex justify-between py-2 ">
              <div className=" flex justify-start space-x-3 text-gray-100">
                <div className=" ">
                  <Link to="#0">
                    <FiTwitter />
                  </Link>
                </div>

                <div className="">
                  <Link to="#0">
                    <GrInstagram />
                  </Link>
                </div>

                <div className="">
                  <Link to="#0">
                    <AiFillFacebook />
                  </Link>
                </div>
              </div>

              <div className=" flex justify-end space-x-3 text-gray-50 text-xs  ">
                <Link to="#0">
                  {" "}
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
                {!isLoggedIn && (
                  <>
                    <Link to="/account/register">
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
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                    </Link>

                    <Link to="/account/login">
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
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <button
                    className="focus-within:outline-none"
                    onClick={handleClick}
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
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* fin pre-header */}

          {/* header */}
          <div className="bg-white flex justify-between items-center">
            {/* seach */}
            <div className="w-full flex justify-between items-center py-2 my-2 mx-2 ">
              <Link to="/" className="flex">
                <LazyLoadImage
                  src={logo}
                  effect="blur"
                  alt="logo transfo"
                  className="w-20 h-16"
                />
                <Link
                  to="/"
                  className=" flex flex-col text-sm mt-4 tracking-tighter font-bold -space-y-1 justify-center pt-2"
                >
                  <span className="text-yellow-500  ">Shop</span>
                  <span className="text-blue-700  pb-1">Transfo</span>
                </Link>
              </Link>
              <div className="  w-full flex items-center justify-center  ">
                <SearchInput />
              </div>

              {/* fin seach */}

              {/* debut profil */}
              <div className="flex space-x-2 justify-center items-center ml-2">
                <Link
                  to="/cart"
                  exact="true"
                  className="focus-within:outline-none w-8 h-8 rounded-full inline-flex justify-center items-center text-gray-500 bg-gray-100 relative"
                >
                  <div>
                    <FaShoppingCart />
                  </div>
                  <span className="absolute text-light text-xs text-center text-white bg-green-500 h-4 w-4 rounded-full -top-1 -right-1">
                    {cartCount}
                  </span>
                </Link>
                {isLoggedIn && (
                  <div className="mt-1">
                    <Profile />
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </LazyLoadComponent>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(Auth.logout()),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.shopping.cart,
    categories: state.categories.data,
    products: state.products.data,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
