import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import {
  addToCart,
  saveToLocalStorage,
} from "../../../redux/actions/cart/cart";
import { StarRating } from "..";
import { formatPrice } from "../../../helpers/format";
import { Rating } from "../../../components/public";

const SpecialItems = ({ cart, addToCart, save, products, loading }) => {
  return (
    <>
      <div className="hidden lg:flex justify-center items-center my-5 ">
        {loading && "Loading..."}
        {!loading && (
          <div className="grid grid-flow-row grid-cols-4 grid-rows-auto gap-4 justify-between w-2/3 ">
            {products.slice(0, 12).map((product) => (
              <Special
                key={product.id}
                product={product}
                cart={cart}
                addToCart={addToCart}
                save={save}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center my-5 lg:hidden ">
        {loading && "Loading..."}
        {!loading && (
          <div className=" flex justify-center ">
            <div className="grid grid-flow-row grid-cols-1 grid-rows-auto gap-4 w-full  ">
              {products.slice(0, 8).map((product) => (
                <Special
                  key={product.id}
                  product={product}
                  cart={cart}
                  addToCart={addToCart}
                  save={save}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, value) => dispatch(addToCart(item, value)),
    save: (items) => dispatch(saveToLocalStorage(items)),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.shopping.cart,
    products: state.products.data,
    loading: state.products.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialItems);

const Special = ({ product, cart, addToCart, save }) => {
  const [rating, setRating] = useState(5);

  useEffect(() => {
    save(cart);
  }, [cart]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const Designation = truncate(product.designation, 30);
  const Designationsm = truncate(product.designation, 22);
  const price = formatPrice(product.prix);

  return (
    <Link to={`/${product.designation}`}>
      <>
        <div className="hidden lg:flex z-0 relative justify-center items-center my-6  shadow py-2 rounded w-52 h-32 hover:bg-gray-50 transition duration-200 ease-in-out  transform hover:-translate-y-1 hover:scale-100 ">
          <div className=" h-full w-full">
            <img
              src={product.image}
              alt="articles speciaux"
              className="h-28 w-28 rounded"
            />
          </div>
          <div className="flex-col w-24 space-between  justify-center space-y-2 text-xs mx-2  ">
            <div className=" flex flex-col space-y-1 h-20">
              <label className="font-semibold capitalize break-words">
                {Designation}
              </label>
              {/* <label className="mt-2">{price}</label> */}
              <Rating value={product.note} />
            </div>
            <button
              onClick={() => {
                addToCart(product, 1);
                toast.success("Le produit a été ajouter a votre panier :)");
              }}
              className="flex bg-yellow-500 rounded  text-white transition duration-500 ease-in-out  justify-center items-center  py-1 w-20 space-x-3  hover:bg-green-500 hover:border-0 "
            >
              <span className="text-xs font-medium">Ajouter</span>
              <FaShoppingCart />
            </button>
          </div>
        </div>
        <div className="flex lg:hidden  justify-center items-center my-2 shadow  rounded w-64 h-32 hover:bg-gray-50 transition duration-200 ease-in-out  transform hover:-translate-y-1 hover:scale-100 ">
          <div className=" h-full w-full">
            <img
              src={product.image}
              alt="articles speciaux"
              className="h-28 w-28 rounded"
            />
          </div>
          <div className="flex-col w-24 space-between  justify-center space-y-1 text-xs mx-2  ">
            <div className=" flex flex-col space-y-1 h-20">
              <label className="font-semibold capitalize">
                {Designationsm}
              </label>
              {/* <label className="mt-2">{price}</label> */}
              <Rating value={product.note} />
            </div>
            <button
              onClick={() => {
                addToCart(product, 1);
                toast.success("Le produit a été ajouter a votre panier :)");
              }}
              className="flex bg-yellow-500 rounded  text-white transition duration-500 ease-in-out  justify-center items-center  py-1 w-20 space-x-3  hover:bg-green-500 hover:border-0 "
            >
              <span className="text-xs font-medium">Ajouter</span>
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </>
    </Link>
  );
};
