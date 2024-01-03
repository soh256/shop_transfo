import React from "react";
import { useDispatch } from "react-redux";
import { ajustQte, removeFromCart } from "../../redux/actions/cart/cart";

export const TableOrders = ({ columns, datas }) => {
    const dispatch = useDispatch();

    return (
        <table className="table-auto w-full bg-gray-100">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-800 bg-gray-200">
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                                {column}
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
                {datas.map((item) => {
                    return (
                        <tr key={item.id}>
                            {columns.map((column, i) => {
                                switch (column) {
                                    case "Total":
                                        return (
                                            <td
                                                key={i}
                                                className="py-2 px-2 border-b border-white flex  items-center justify-start space-x-2 "
                                            >
                                                <button
                                                    onClick={() => {
                                                        dispatch(
                                                            ajustQte(
                                                                item,
                                                                item["qte"] > 1
                                                                    ? item[
                                                                          "qte"
                                                                      ] - 1
                                                                    : 1
                                                            )
                                                        );
                                                    }}
                                                    className="bg-green-600 text-white rounded focus:outline-none "
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 "
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </button>
                                                <span>{item["qte"]}</span>
                                                <button
                                                    onClick={() => {
                                                        dispatch(
                                                            ajustQte(
                                                                item,
                                                                item["qte"] <
                                                                    item[
                                                                        "qte_stock"
                                                                    ]
                                                                    ? item[
                                                                          "qte"
                                                                      ] + 1
                                                                    : item[
                                                                          "qte_stock"
                                                                      ]
                                                            )
                                                        );
                                                    }}
                                                    className="bg-blue-550 text-white rounded focus:outline-none "
                                                >
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
                                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </button>
                                            </td>
                                        );

                                    case "Montant":
                                        return (
                                            <td
                                                key={i}
                                                className="py-2 px-2 border-b border-white"
                                            >
                                                <span>
                                                    {item["prix"] * item["qte"]}
                                                </span>
                                            </td>
                                        );
                                    case "Action":
                                        return (
                                            <td
                                                key={i}
                                                className="py-2 px-2 border-b border-white"
                                            >
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            removeFromCart(
                                                                item["id"]
                                                            )
                                                        )
                                                    }
                                                    className="bg-red-800 rounded text-white  flex justify-start"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 "
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
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
    );
};
