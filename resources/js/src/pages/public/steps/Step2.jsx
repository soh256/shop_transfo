import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import om from "../../../assets/images/om.png";
import mtn from "../../../assets/images/mtn.png";
import delyver from "../../../assets/images/delyver.png";
import { useSelector, useDispatch } from "react-redux";
import OrderService from "../../../Services/Order.service";
import swal from "sweetalert";
import { saveToLocalStorage, cleanCart } from "../../../redux/actions/cart/cart";

// import "./style.css";

export const Step2 = ({ setActiveStep }) => {
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);

    const cart = useSelector((state) => state.shopping.cart);
    const dispatch = useDispatch();

    const handleChange = ({ target }) => {
        setOrder({
            ...order,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await OrderService.Add(order);
            setLoading(false);
            dispatch(cleanCart())
            dispatch(saveToLocalStorage([]))
            setActiveStep(2);
        } catch ({ response }) {
            swal(response.data.message, { icon: "error" });
            setLoading(false);
        }
    };

    useEffect(() => {
        let products = [];
        cart.map((item) => {
            products.push({ product: item.id, qte: item.qte });
        });
        setOrder({
            ...order,
            products: products,
        });
    }, []);
    return (
        <div className="h-auto  lg:px-6 my-10">
            <p className=" flex flex-col space-y-2">
                <span className=""> Veuillez choisir un moyen d'Achat: </span>

                <span className="ml-2">
                    <span className=" font-bold pr-2">Delivery</span>pour la
                    livraison physique.
                    <br />
                    <span className=" font-bold  pr-2">Orange Money</span> pour
                    payer via orange money.
                    <br />
                    <span className=" font-bold  pr-2">Mtn</span>
                    pour payer via Mtn mobile money.
                </span>
            </p>
            <div className="mt-4 hidden  lg:flex flex-wrap justify-center items-center space-x-4 ">
                <Radio
                    value="1"
                    image={delyver}
                    alt="delyver"
                    handleChange={handleChange}
                    curentValue={order.paiement_methode}
                    disabled={false}
                />
                <Radio
                    value="2"
                    image={om}
                    alt="om"
                    handleChange={handleChange}
                    curentValue={order.paiement_methode}
                    disabled={true}
                />
                <Radio
                    value="3"
                    image={mtn}
                    alt="mtn"
                    handleChange={handleChange}
                    curentValue={order.paiement_methode}
                    disabled={true}
                />
            </div>
            <div className="mt-4  flex lg:hidden flex-wrap space-y-4  justify-center items-center  ">
                <Radio
                    value="1"
                    image={delyver}
                    alt="delyver"
                    handleChange={handleChange}
                    curentValue={order.paiement_methode}
                    disabled={false}
                />
                <Radio
                    value="2"
                    image={om}
                    alt="om"
                    handleChange={handleChange}
                    curentValue={order.paiement_methode}
                    disabled={true}
                />
                <Radio
                    value="3"
                    image={mtn}
                    alt="mtn"
                    handleChange={handleChange}
                    curentValue={order.paiement_methode}
                    disabled={true}
                />
            </div>
            {order.paiement_methode && (
                <div className=" flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className=" px-5 py-1 bg-green-500 text-white text-xs mt-5 rounded hover:bg-green-700 focus:outline-none"
                    >
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
};

const Radio = ({ image, alt, value, handleChange, curentValue, disabled }) => {
    return (
        <label
            tabIndex="0"
            className={`relative h-30 w-40 py-2 focus:border-green-700 text-green-700 ounded-lg border-2 ${
                disabled ? "border-gray-500" : "border-blue-700"
            } ${
                curentValue === value && !disabled && "border-green-700"
            } hover:bg-gray-100 rounded shadow-md  ${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
            } focus:outline-none p-4 flex justify-center items-center`}
        >
            {curentValue === value && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute h-5 w-5 -top-3 -right-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
            <img
                src={image}
                className="hover:bg-gray-100 h-20 w-28"
                alt={alt}
            />
            {disabled && (
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-200 opacity-70"></div>
            )}
            <input
                type="radio"
                className="hidden"
                name="paiement_methode"
                disabled={disabled}
                value={value}
                onChange={handleChange}
            />
        </label>
    );
};
