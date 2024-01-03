import React, { useState, useEffect } from "react";
import { Table } from "../../components/private";
import ProductService from "../../Services/Product.service";
import { FilterButton } from "../../components/partials/actions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Products = () => {
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);

  const columns = [
    "designation",
    "prix",
    "qte_stock",
    "marque",
    "category",
    "image",
  ];
  const posTexte = "text-left";

  return (
    <>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <h1 className="font-semibold text-gray-800">Products</h1>
        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton />
          {/* Add view button */}
          <Link
            to="/admin/products/new"
            className="font-medium text-sm inline-flex items-center justify-center border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out px-2.5 py-2  bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <svg
              className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add new</span>
          </Link>
        </div>
      </div>
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Products</h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <Table
              loading={loading}
              columns={columns}
              datas={products}
              name={"products"}
              aligne={posTexte}
            />
          </div>
        </div>
      </div>
    </>
  );
};
