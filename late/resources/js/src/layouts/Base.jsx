import React from "react";
import { Footer, MobileMenu } from "../components/public";
import Header from "../components/public/Header";

export const Base = ({ children }) => {
  return (
    <div className="bg-gray-100 relative">
      <div className="hidden bg-gray-100 lg:block relative">
        <Header />
        {children}
        <div className="2xl:mt-10 2xl:-pt-28   inset-x-0 bottom-0">
          <Footer />
        </div>
      </div>

      <div className="block lg:hidden h-screen  overflow-scroll scrollbar-hide ">
        {/* <div className="fixed"> */}
        <Header />
        {/* </div> */}
        <div className=" z-0 mt-32 ">{children}</div>
        <Footer />
        <div className="fixed z-50 inset-x-0 bottom-0  w-full">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};
