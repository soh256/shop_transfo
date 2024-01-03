import React, { useState, useEffect } from "react";
import OrderService from "../../Services/Order.service";
import moment from "moment";
import { useParams } from "react-router-dom";
import { formatPrice } from "../../helpers/format";
import { useLocation } from "react-router-dom";

export const OrderDetailPublic = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const columns = ["designation", "pu", "qte", "montant"];

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await OrderService.Get(id);
      setOrder(data);
      setLoading(false);
    } catch ({ response }) {
      setLoading(false);
      console.log(response);
    }
  };
  useEffect(() => {
    fetchData();
  }, [loading]);

  return !loading ? (
    <div className="flex justify-center h-auto bg-white my-4">
      <div className="w-2/3 ">
        <div className="h-full w-full bg-white rounded flex flex-col  ">
          <div className="w-full h-12 py-3 text-gray-600 uppercase border-b-2 shadow border-gray-300 flex justify-center items-center font-medium text-sm text-normal">
            Commande numero: {order?.id}
          </div>
          <div className="py-4  flex justify-between mt-14 ">
            <div className="flex flex-col space-y-4">
              <div className="  flex space-x-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-sm text-gray-600   text-normal pt-0.5">
                  Clients
                </p>
              </div>
              <p className="  flex flex-col  space-y-2 text-xs text-gray-600  text-normal ml-4 ">
                <label>
                  <span className="font-medium">Nom et Prenom: </span>
                  {`${order?.user.first_name} ${order?.user.first_name}`}
                </label>
                <label>
                  <span className="font-medium">Email: </span>
                  {order?.user.email}
                </label>
                <label>
                  <span className="font-medium">Phone: </span>
                  {order?.user.phone}
                </label>
              </p>
            </div>{" "}
            <div className="flex flex-col space-y-4">
              <div className="  flex  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-sm text-gray-600 font-medium  text-normal pt-0.5">
                  Commande
                </p>
              </div>
              <p className="  flex flex-col  space-y-2 text-xs text-gray-600  text-normal ml-4 ">
                <label>
                  <span className="font-medium">Numero: </span> {order?.id}
                </label>
                <label>
                  <span className="font-medium">Créer le: </span>
                  {moment(order?.created_at).format("dddd, DD MMMM yyyy")}
                </label>{" "}
                <label>
                  <span className="font-medium">Total a payé: </span>
                  {formatPrice(order?.nap)}
                </label>
                <label>
                  <span className="font-medium">Total des rémises: </span>
                  {formatPrice(order?.total_discount)}
                </label>
                <label>
                  <span className="font-medium">Statut: </span>
                  <span
                    className={`inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none ${
                      order?.status
                        ? "bg-green-600 text-green-100"
                        : "bg-yellow-600 text-yellow-100"
                    } rounded-full`}
                  >
                    {order?.status ? "Complet" : "En Cours"}
                  </span>
                </label>
              </p>
            </div>
          </div>
          <div className="">
            <div className=" flex items-center space-x-2  mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path
                  fillRule="evenodd"
                  d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <label className="text-sm font-medium space-x-2">
                <span>Articles Commandés</span>
                <span>{order?.products.length}</span>
              </label>
            </div>
            <table className="table-auto w-full bg-gray-100">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-200">
                <tr>
                  {columns.map((column, index) => (
                    <th key={index} className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">{column}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100">
                {order?.products.map((item) => {
                  return (
                    <tr key={item.id}>
                      {columns.map((column, i) => {
                        switch (column) {
                          case "qte":
                            return (
                              <td
                                key={i}
                                className="py-2 px-2 border-b border-white"
                              >
                                {item["pivot"].quantity}
                              </td>
                            );
                          case "pu":
                            return (
                              <td
                                key={i}
                                className="py-2 px-2 border-b border-white"
                              >
                                {formatPrice(item["price"])}
                              </td>
                            );

                          case "montant":
                            return (
                              <td
                                key={i}
                                className="py-2 px-2 border-b border-white"
                              >
                                <span>
                                  {formatPrice(
                                    item["price"] * item["pivot"].quantity
                                  )}
                                </span>
                              </td>
                            );
                          default:
                            return (
                              <td
                                key={i}
                                className="py-2 px-2 border-b border-white"
                              >
                                {item[column]}
                              </td>
                            );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mb-5  ">
            <div className="font-medium">
              <button className="bg-green-700 hover:bg-green-800 py-1  text-white flex justify-center items-center transform ease-in-out rounded w-36 mt-8 space-x-1  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                <span>Imprimer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    "loading..."
  );
};
