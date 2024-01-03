import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { formatPrice } from "../../../helpers/format";
import { ajustQte, removeFromCart } from "../../../redux/actions/cart/cart";

const CartItem = ({ item, remove, ajuste }) => {
    const [input, setInput] = useState(item.qte);

    const handleChange = (e) => {
        if (e.target.value < 1) {
            setInput(1);
            toast.warning("La quantitée acheter ne peut être null :(");
        } else if (parseInt(e.target.value) > item.qte_stock) {
            toast.warning("Oups notre stock est insufisant :(");
        } else {
            setInput(e.target.value);
        }
    };

    useEffect(() => {
        ajuste(item, input);
    }, [input]);
    const prix = formatPrice(item.prix);
    const prixTotal = formatPrice(item.prix * item.qte);

    return (
        <div className="flex justify-start items-center hover:bg-gray-100 -mx-12 lg:px-6  py-5">
            <div className="flex w-2/5 ">
                <div className=" hidden lg:block w-36">
                    <img
                        className="h-24 rounded w-32 ml-6"
                        src={item.image}
                        alt={item.designation}
                    />
                </div>
                <div className=" block lg:hidden w-20">
                    <img
                        className="h-14 rounded w-16 ml-6"
                        src={item.image}
                        alt={item.designation}
                    />
                </div>
                <div className="flex flex-col justify-between ml-8 flex-grow">
                    <span className="font-bold text-xs lg:text-sm">
                        {item.designation}
                    </span>
                    <span className="text-red-500 text-xs md:text-sm">
                        {item.marque.nom}
                    </span>
                    <button
                        className="font-medium hover:text-red-500 focus:text-red-500 text-gray-500 text-xs w-auto text-left"
                        onClick={() => {
                            remove(item.id);
                            toast.success(
                                "Le produit a été supprimer de votre panier"
                            );
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="flex  items-center w-1/5">
                <input
                    className="mx-2 p-2 border rounded  w-12 h-8"
                    type="number"
                    value={input}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <span className=" hidden lg:block text-center w-1/5 -mx-10 font-medium text-xs md:text-sm">
                {prix}
            </span>
            <span className=" hidden lg:block text-center w-1/5 mx-6 font-medium text-xs md:text-sm">
                {prixTotal}
            </span>
            <span className=" lg:hidden text-center flex flex-wrap w-1/4 font-medium text-xs md:text-sm">
                {prix}
            </span>
            <span className=" lg:hidden text-center w-1/4 font-medium text-xs">
                {prixTotal}
            </span>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (item) => dispatch(removeFromCart(item)),
        ajuste: (item, value) => dispatch(ajustQte(item, value)),
    };
};

export default connect(null, mapDispatchToProps)(CartItem);
