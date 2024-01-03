import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import orders from "../../../assets/images/orders.png";
import { Link } from "react-router-dom";
import ProductService from "../../../Services/Product.service";
import { FaShoppingCart } from "react-icons/fa";
import { connect } from "react-redux";
import {
  addToCart,
  saveToLocalStorage,
} from "../../../redux/actions/cart/cart";
import { toast } from "react-toastify";
import { StarRating } from "..";
import { formatPrice } from "../../../helpers/format";
import { Rating } from "../../../components/public";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ThreeDots from "../../../components/loader/ThreeDots";

const Produit = ({ addToCart, cart, save }) => {
  const [count, setCount] = useState(1);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const { designation } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);

  const price = formatPrice(product.prix);
  const fetchData = async (design) => {
    try {
      const { data } = await ProductService.Get(design);
      setProduct(data);
      // console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(designation);
  }, [designation]);

  useEffect(() => {
    save(cart);
  }, [cart]);
  console.log(product);

  return (
    <LazyLoadComponent>
      <div className="bg-white w-full h-screen  ">
        {loading && <ThreeDots />}
        {!loading && (
          <>
            <div className="bg-gray-300 py-4 flex items-center justify-center ">
              <div className="w-2/3 flex ">
                <label className="text-xl  text-black ">
                  {product.designation}
                </label>
              </div>
            </div>

            <div className=" w-full flex justify-center items-center my-10 mt-20">
              <div className=" lg:w-2/3 h-auto  mb-4   flex flex-col lg:flex-row p-3 space-y-4 lg:space-y-0 space-x-10 lg:space-x-20  shadow-md rounded-md">
                <div className=" flex flex-col lg:w-1/2 h-auto space-y-14  justify-start lg:place-items-end ">
                  <div className="inline-block">
                    <LazyLoadImage
                      src={image === "" ? product.image : image}
                      alt="image detaillé du produit"
                      className="w-96 h-56 rounded-md"
                    />
                  </div>
                  <div className="flex space-x-3 flex-wrap h-115 lg:mx-10 ">
                    {product.images.map((image, i) => (
                      <button
                        key={i}
                        onMouseEnter={() => {
                          setImage(image.url);
                        }}
                        className="flex py-1  mt-5  justify-center items-center w-24 rounded-md focus:outline-blue foucus:rounded"
                      >
                        <LazyLoadImage
                          src={image.url}
                          className="rounded-md w-24 h-16"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className=" flex flex-col justify-center lg:justify-start  lg:w-1/2  lg:space-y-2 ">
                  <div className="text-gray-600 text-2xl ">
                    {product.designation}
                  </div>
                  <div className="flex space-x-2">
                    <Rating value={product.note} />
                  </div>
                  {/* <div className="flex ">{price}</div> */}
                  <div className="flex text-xs">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.description,
                      }}
                    />
                  </div>
                  <div className="flex bg-site-700 p-1 test-xs ">
                    <span className="w-2/5">Marque </span>{" "}
                    <div className="w-3/5">{product.marque}</div>
                  </div>
                  <div className="flex bg-site-700 p-1 test-xs ">
                    <span className="w-2/5">Modèle </span>{" "}
                    <div className="w-3/5">{product.model}</div>
                  </div>
                  <div className="flex">
                    <span className="w-2/5">Quantite en stock</span>
                    <div className="text-green-500 w-3/5 ">
                      {product.qte_stock}
                    </div>
                  </div>
                  <div className=" flex border border-gray-500 rounded w-32 max-h-8 ">
                    <button
                      onClick={() => setCount(count > 1 ? count - 1 : 1)}
                      className=" flex border-r border-gray-500 w-1/3 justify-center items-center"
                    >
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                    <label className="border-r border-gray-500 w-1/3 flex justify-center items-center ">
                      <span> {count} </span>
                    </label>
                    <button
                      onClick={() =>
                        setCount(
                          count < product.qte_stock
                            ? count + 1
                            : product.qte_stock
                        )
                      }
                      className=" w-1/3 flex justify-center items-center"
                    >
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    {/* <Link
                                            to="#0"
                                            className="flex border-2 focus-within:outline-none border-yellow-500 bg-yellow-500 rounded-md  text-white  hover:text-white justify-center items-center p-1 w-auto  focus:bg-green-500 hover:bg-green-500  focus:border-white hover:border-white transition duration-500 ease-in-out"
                                        >
                                            <span className="text-sm font-medium hidden lg:block">
                                                Achetez maintenant
                                            </span>
                                            <span className="text-sm font-medium px-3  text-center flex justify-center  lg:hidden">
                                                <span>Achetez</span>
                                            </span>
                                        </Link> */}
                    <button
                      disabled={product.qte_stock == 0}
                      onClick={() => {
                        addToCart(product, count);
                        toast.success(
                          "Le produit a été ajouter a votre panier :)"
                        );
                      }}
                      className={`${
                        product.qte_stock == 0 && "cursor-not-allowed"
                      } flex border-2 focus-within:outline-none space-x-2 border-yellow-500 bg-white rounded-md  text-yellow-500 hover:text-white focus:text-white justify-center items-center p-1 w-auto  hover:bg-green-500 focus:bg-green-500 focus:border-green-500 hover:border-white transition duration-500 ease-in-out`}
                    >
                      <span className="text-sm font-medium hidden lg:block">
                        Ajouter au chariot
                      </span>
                      <span className="text-sm font-medium  lg:hidden">
                        + chariot
                      </span>
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
          </>
        )}
      </div>
    </LazyLoadComponent>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Produit);
