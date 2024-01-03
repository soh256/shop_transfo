import React, { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, Redirect } from "react-router-dom";
import avatar from "../../assets/images/user-avatar-32.png";
import {useDispatch, useSelector} from "react-redux";
import Auth from "../../redux/actions/auth/Auth";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const Profile = () => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.auth.user.role) === "admin"

    const handleClick = () => {
        dispatch(Auth.logout());
        window.location.reload();
        // return <Redirect to="/account/login" />;
    };
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="focus-within:outline-none w-8 h-8 rounded-full bg-gray-200">
                <img
                    src={avatar}
                    alt=""
                    className=" rounded-full focus-within:outline-none p-2"
                    // aria-hidden="true"
                />
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
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/account"
                                    className={`${
                                        active
                                            ? "bg-gray-200 bg-opacity-50 text-gray-900"
                                            : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                    Profil
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    {isAdmin && <div className="px-1 py-1 ">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/admin"
                                    className={`${
                                        active
                                            ? "bg-gray-200 bg-opacity-50 text-gray-900"
                                            : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                    Dashboard
                                </Link>
                            )}
                        </Menu.Item>
                    </div>}
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={handleClick}
                                    className={`${
                                        active
                                            ? "bg-gray-200 bg-opacity-50 text-gray-900"
                                            : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none`}
                                >
                                    Déconnexion
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
