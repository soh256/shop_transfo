import React, { useState, useEffect } from "react";
import Customer from "../../Services/Customer";
import { Table, TableOrders } from "../../components/private";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Select from "react-select";
import { addToCart } from "../../redux/actions/cart/cart";
import OrderService from "../../Services/Order.service";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export const AddOrders = () => {
    const [order, setOrder] = useState({
        custom: null,
        paie_amount: 0,
        products: [],
    });
    const [clients, setClients] = useState(null);
    const [product, setProduct] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [paieAmount, setPaieAmount] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const history = useHistory();
    const columns = ["designation", "prix", "Total", "Montant", "Action"];

    moment.locale("fr");

    const products = useSelector((state) => state.products.data).filter(
        (product) => product.qte_stock > 0
    );
    const cart = useSelector((state) => state.shopping.cart);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const { data } = await Customer.All();
            setClients(data);
        } catch (error) {}
    };

    const handelSelectProduct = (product) => {
        setProduct(product);
    };

    const handleQteChange = ({ target }) => {
        const { value } = target;
        if (product !== null) {
            if (value <= product.qte_stock) {
                setQuantity(parseInt(value));
            }
        }
    };
    const handelSelectClient = (client) => {
        setOrder({ ...order, custom: client.id });
    };

    const handleSubmitOrder = async () => {
        if (order.custom) {
            if (order.paie_amount >= paieAmount - discount) {
                try {
                    const { data } = await OrderService.Add(order);
                    swal("Votre commande a ete enregistre!", {
                        icon: "success",
                    });
                    history.push("/admin/orders");
                } catch ({ response }) {
                    const { data } = response;
                    swal(data.message, {
                        icon: "error",
                    });
                }
            } else {
                swal(
                    "Oups! La somme que vous versez doit etre superieur ou egal au NAP",
                    {
                        icon: "error",
                    }
                );
            }
        } else {
            swal("Oups! Veuillez choisir le client", {
                icon: "error",
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let totalDisc = 0;
        let totalAmount = 0;
        cart.map((item) => {
            totalAmount += item.prix * item.qte;
            totalDisc += ((item.prix * item.remise) / 100) * item.qte;
        });
        setDiscount(totalDisc);
        setPaieAmount(totalAmount);
    }, [cart]);

    return (
        <div className="h-auto px-3">
            <div className="h-full w-full bg-white rounded flex flex-col  ">
                <div className="w-full h-12 py-3 text-gray-600 uppercase border-b-2 shadow border-gray-300 flex justify-center items-center font-medium text-sm text-normal">
                    Nouvelle Commande
                </div>
                <div className="py-4 px-8 flex flex-col ">
                    <div className="flex justify-end">
                        <div className="flex space-x-2 capitalize">
                            {moment().format("dddd, DD MMMM yyyy")}
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        {clients !== null && (
                            <div className=" w-2/5 text-white">
                                <p className="text-sm text-gray-600  text-normal">
                                    Clients
                                </p>

                                <Select
                                    name="clientsSelect"
                                    getOptionLabel={({ nom }) => nom}
                                    onChange={handelSelectClient}
                                    options={clients}
                                    placeholder="Recherchez un Client"
                                />
                            </div>
                        )}
                        <div className="flex justify-between">
                            <div className="flex space-x-6 w-full items-center">
                                <div className="w-96">
                                    <p className="text-sm text-gray-600 text-normal ">
                                        Produits
                                    </p>
                                    <Select
                                        name="productsSelect"
                                        getOptionLabel={({ designation }) =>
                                            designation
                                        }
                                        onChange={handelSelectProduct}
                                        options={products}
                                        placeholder="Recherchez un produit"
                                    />
                                </div>{" "}
                                <div className="">
                                    <p className="text-sm text-gray-600 text-normal mb-1 ">
                                        Quantite
                                    </p>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQteChange}
                                        className="border border-gray-300 rounded h-9 w-28 px-1"
                                    />
                                </div>{" "}
                                <div className="w-20">
                                    <p className="text-sm text-gray-600 text-normal mb-1  ">
                                        Montant
                                    </p>
                                    <input
                                        value={
                                            product !== null
                                                ? product.prix * quantity
                                                : "NaN"
                                        }
                                        disabled={true}
                                        className="border border-gray-300 rounded h-9 w-36 px-1"
                                    />
                                </div>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        if (product !== null) {
                                            dispatch(
                                                addToCart(product, quantity)
                                            );
                                            setOrder({
                                                ...order,
                                                products: [
                                                    ...order.products,
                                                    {
                                                        product: product.id,
                                                        qte: quantity,
                                                    },
                                                ],
                                            });
                                        }
                                    }}
                                    disabled={product === null}
                                    className={`${
                                        product === null && "cursor-not-allowed"
                                    } bg-green-500 hover:bg-green-600 rounded h-9 px-3 w-auto text-white font-medium`}
                                >
                                    Ajouter
                                </button>
                            </div>
                        </div>
                        {product !== null && (
                            <>
                                <div className=" flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        />
                                    </svg>
                                    <label className="text-xs">
                                        <span>{product.qte_stock}</span> en
                                        Stock
                                    </label>
                                </div>
                                <div className=" flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <label className="text-xs">
                                        <span>{product.prix}</span> L'unité
                                    </label>
                                </div>
                            </>
                        )}
                        <TableOrders columns={columns} datas={cart} />
                    </div>
                    {cart.length > 0 && (
                        <div className="flex justify-end mb-5">
                            <div className="flex flex-col space-y-3 font-medium">
                                <label className="space-x-2">
                                    Montant Total:
                                    <span className="">
                                        {paieAmount}{" "}
                                        <span className="">xaf</span>
                                    </span>
                                </label>
                                <label className="space-x-2">
                                    Total remise:
                                    <span className="">
                                        {discount} <span className="">xaf</span>
                                    </span>
                                </label>
                                <label>
                                    Total a payer:
                                    <span>
                                        {paieAmount - discount}{" "}
                                        <span className="">xaf</span>
                                    </span>
                                </label>
                                <input
                                    value={order.paie_amount}
                                    onChange={(e) =>
                                        setOrder({
                                            ...order,
                                            paie_amount: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 rounded h-9 px-2"
                                    placeholder="Montant à payer"
                                />
                                <button
                                    disabled={order.paie_amount === 0}
                                    onClick={handleSubmitOrder}
                                    className={`${
                                        order.paie_amount === 0 &&
                                        "cursor-not-allowed"
                                    } focus:outline-none bg-green-700 hover:bg-green-800 py-1  text-white flex justify-center items-center transform ease-in-out rounded`}
                                >
                                    Payer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
