import React, { useState } from "react";
import { StarRating } from "../../../pages";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../helpers/format";
import { Rating } from "../Starrating";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

export const ModelView = ({ product }) => {
  const [rating, setRating] = useState(5);
  const price = formatPrice(product.prix);

  // const handleChang = (value) => {
  //     setRating(value);
  // };
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const Designation = truncate(product.designation, 30);
  const Designationlg = truncate(product.designation, 35);

  return (
    <LazyLoadComponent>
      <Link to={`/${product.designation}`} className="">
        <div className=" hidden lg:block  z-0 bg-white w-44 h-52 space-y-2  rounded-xl  shadow-lg border-opacity-0 hover:bg-gray-50 transition duration-200 ease-in-out  transform hover:-translate-y-1 hover:scale-100  ">
          <div className=" h-3/5 flex justify-center items-center p-2 rounded-lg border-b-2 border-gray-200 border-opacity-30 ">
            <LazyLoadImage
              src={product.image}
              alt="article"
              className="h-full w-full rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center items-center px-3 w-40  pb-3  ">
            <p className="text-xs h-1/5  font-semibold capitalize break-words">
              {Designationlg}
            </p>
            <div className="h-1/4">
              <Rating value={product.note} />
            </div>
            {/* <label className="text-xs  h-1/5 font-medium pt-2">{price}</label> */}
          </div>
        </div>
        <div className="  lg:hidden z-0 bg-white w-36 h-48  rounded-xl  shadow-lg border-opacity-0 hover:bg-gray-50 transition duration-200 ease-in-out  transform hover:-translate-y-1 hover:scale-100  ">
          <div className=" h-3/5 flex justify-center items-center p-2 rounded-lg border-b-2 border-gray-200 border-opacity-30 ">
            <LazyLoadImage
              src={product.image}
              alt="article"
              className="h-full w-full rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center items-center px-3 2/5  pb-3  ">
            <p className="text-xs h-1/5 font-semibold capitalize">
              {Designation}
            </p>
            <div className="h-1/4">
              <Rating value={product.note} />
            </div>
            {/* <label className="text-xs  h-1/5 font-medium">{price}</label> */}
          </div>
        </div>
      </Link>
    </LazyLoadComponent>
  );
};
