import React, { useState, useEffect } from "react";
import { Header, Sidebar } from "../components/private";
import { useLocation } from "react-router-dom";
import { focusHandling } from "cruip-js-toolkit";

export const BaseAdmin = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        document.querySelector("html").style.scrollBehavior = "auto";
        window.scroll({ top: 0 });
        document.querySelector("html").style.scrollBehavior = "";
        focusHandling("outline");
    }, [location.pathname]); // triggered on route change

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto h-full bg-gray-100 ">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
