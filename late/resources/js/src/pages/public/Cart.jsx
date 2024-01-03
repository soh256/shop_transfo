import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import CartItem from "./cart/cartItem";
import { saveToLocalStorage } from "../../redux/actions/cart/cart";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/format";

const Cart = ({ cart, history, remove, save, ajuste }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [remise, setRemise] = useState(0);

  useEffect(() => {
    let x = 0;
    cart.map((item) => (x += item.qte * item.prix));
    setTotalAmount(x);
    save(cart);
    let r = 0;
    cart.map((item) => (r += ((item.prix * item.remise) / 100) * item.qte));
    setRemise(r);
  }, [cart]);
  const totalA = formatPrice(totalAmount);
  const netPayer = totalAmount - remise;

  return (
    <div className="inline-flex w-full justify-center items-center bg-white">
      <div className="flex flex-col lg:flex-row lg:w-4/5  shadow-md my-10">
        <div className="lg:w-3/4 bg-white px-10 py-10 text-gray-700">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-medium text-2xl ">Mon Panier</h1>
            <h2 className="font-medium text-2xl">{cart.length} Element(s)</h2>
          </div>
          <div className=" hidden lg:flex mt-10 mb-5 text-gray-700 text-left lg:text-center">
            <h3 className="font-medium  text-xs uppercase w-2/5">Details</h3>
            <h3 className="font-medium   text-xs uppercase w-1/5 ">Quantité</h3>
            <h3 className="font-medium  text-xs uppercase w-1/5 ">Prix</h3>
            <h3 className="font-medium  text-xs uppercase w-1/5 ">Total</h3>
          </div>
          <div className="flex lg:hidden mt-10 mb-5 -mx-14 text-gray-700 ">
            <h3 className="font-medium text-center text-xs uppercase w-2/5">
              Details
            </h3>
            <h3 className="font-medium   text-xs uppercase w-1/5 ">Quantité</h3>
            <h3 className="font-medium  text-xs uppercase w-1/5 ">Prix</h3>
            <h3 className="font-medium  text-xs uppercase w-1/5 ">Total</h3>
          </div>
          {cart.length > 0 && (
            <>
              {cart.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </>
          )}
          {cart.length === 0 && (
            <div className="text-center p-4">
              <p className="text-red-500 font-medium text-sm">Panier vide</p>
            </div>
          )}
          <button
            onClick={() => history.goBack()}
            className="flex font-medium text-green-500 text-sm mt-10 focus:outline-none"
          >
            <svg
              className="fill-current mr-2 text-green-500 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continuer vos achats
          </button>
        </div>

        <div id="summary" className=" lg:w-1/4 px-8 py-10 bg-gray-100">
          <h1 className="font-medium text-2xl border-b pb-8">Récapitulatif</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-medium text-sm uppercase">
              {cart.length} Element(s)
            </span>
            <span className="font-medium text-sm">
              {formatPrice(totalAmount)}
            </span>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-medium justify-between py-2 text-sm uppercase">
              <span>Prix total</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex font-medium justify-between py-2 text-sm uppercase">
              <span>Remise</span>
              <span>{formatPrice(remise)} </span>
            </div>
            <div className="flex font-medium justify-between py-2 text-sm uppercase">
              <span>Net a Payer</span>
              <span>{formatPrice(netPayer)}</span>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={() => {
                history.push("/checkout");
              }}
              className={`${
                cart.length === 0 ? "bg-gray-500" : "bg-green-500"
              } font-medium ${
                cart.length === 0 ? "hover:bg-gray-500" : "hover:bg-green-500"
              } py-3 px-6 text-sm text-white uppercase w-full rounded focus-within:outline-none focus:outline-none`}
            >
              Caisse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shopping.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (item) => dispatch(removeFromCart(item)),
    save: (item) => dispatch(saveToLocalStorage(item)),
    ajuste: (item, value) => dispatch(ajustQte(item, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
