import React, { useState } from "react";
import { formatPrice } from "../../helpers/format";
import { toast } from "react-toastify";

export const OrderItem = ({ item, columns, deleteItem }) => {
  const [input, setInput] = useState(item["pivot"].quantity);

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

  return (
    <tr>
      {columns.map((column, i) => {
        switch (column) {
          case "qte":
            return (
              <td key={i} className="py-2 px-2 border-b border-white">
                <input
                  onChange={(e) => handleChange(e)}
                  type="number"
                  value={input}
                  className=" w-16 h-7 bg-gray-100 rounded"
                />
              </td>
            );
          case "pu":
            return (
              <td key={i} className="py-2 px-2 border-b border-white">
                {formatPrice(item["price"])}
              </td>
            );

          case "montant":
            return (
              <td key={i} className="py-2 px-2 border-b border-white">
                <span>{formatPrice(item["price"] * input)}</span>
              </td>
            );
          default:
            return (
              <td key={i} className="py-2 px-2 border-b border-white">
                {item[column]}
              </td>
            );
        }
      })}
      <button
        onClick={() => deleteItem(item.id)}
        className="py-2 px-2 border-b border-white focus-within:outline-none text-red-500 focus:text-red-600"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </tr>
  );
};
