import TableLoader from "../loader/TableLoader";
import { EditMenu } from "../partials/actions";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "./table/Pagination";
import ProductService from "../../Services/Product.service";
import OrderService from "../../Services/Order.service";
import FeatureService from "../../Services/Feature.service";
import swal from "sweetalert";
import { formatPrice } from "../../helpers/format";
import moment from "moment";
import { useDispatch } from "react-redux";
import Product from "../../redux/actions/product/Product";

moment.locale("fr");

const operation = {
  products: (id) => ProductService.Delete(id),
  features: (id) => FeatureService.Delete(id),
  orders: (id) => OrderService.Delete(id),
};

export const Table = ({
  loading,
  columns,
  datas,
  name,
  setLoading,
  setOrders,
  active,
  aligne,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const perPage = 8;
  const viewData = currentPage * perPage;
  const pageCount = Math.ceil(datas?.length / perPage);
  const sliceData = datas?.slice(viewData, viewData + perPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };
  const changeStatus = async (id) => {
    const oldOders = [...datas];
    let currentStatus = null;
    setOrders(
      [...datas].filter((order) => {
        if (order.id === id && order.statut <= 1) {
          order.statut++;
          currentStatus = { status: order.statut };
          return true;
        }
        return true;
      })
    );

    try {
      const { data } = await OrderService.putStatus(id, currentStatus);
    } catch ({ response }) {
      setOrders(oldOders);
    }
  };

  const deleteItem = (id) => {
    swal({
      title: "Êtes-vous sûr?",
      text: "Une fois supprimé, vous ne pourrez pas récupérer ce fichier !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        try {
          const deleted = (async () => {
            try {
              const { data } = await operation[name](id);
              if (name === "products") {
                dispatch(Product.fetchProduct());
              } else {
                setLoading(true);
              }
              return data;
            } catch ({ response }) {
              swal(response.data.message, {
                icon: "error",
              });
            }
          })();
          swal("Poof! Votre fichier  a été supprimé!", {
            icon: "success",
          });
        } catch (error) {
          swal("Oups! Erreur!", {
            icon: "error",
          });
        }
      } else {
        swal("Votre fichier est en sécurité!");
      }
    });
  };
  return !loading ? (
    <>
      <table className="table-auto w-full">
        {/* Table header */}
        <thead className="text-xs  font-semibold uppercase text-gray-400 bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-2 whitespace-nowrap">
                <div className={`font-medium ${aligne}`}>{column}</div>
              </th>
            ))}
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left">Action</div>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm divide-y divide-gray-100">
          {name === "orders"
            ? sliceData.map((item) => {
                return (
                  <tr key={item.id}>
                    {columns.map((column, index) => {
                      switch (column.toLowerCase()) {
                        case "role":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {item[column.toLowerCase()]["role"]}
                              </div>
                            </td>
                          );
                        case "image":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                <img
                                  className="w-10 h-10 rounded-md"
                                  src={item[column.toLowerCase()]}
                                />
                              </div>
                            </td>
                          );
                        case "montant":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {formatPrice(item[column.toLowerCase()])}
                              </div>
                            </td>
                          );
                        case "date":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800 capitalize">
                                {moment(item[column.toLowerCase()]).format(
                                  "ll"
                                )}
                              </div>
                            </td>
                          );
                        case "statut":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <span
                                onClick={() => changeStatus(item["id"])}
                                className={`inline-flex cursor-pointer items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none ${
                                  item[column.toLowerCase()]
                                    ? "bg-green-600 text-green-100"
                                    : "bg-yellow-600 text-yellow-100"
                                } rounded-full`}
                              >
                                {item[column.toLowerCase()] === 0 && "Nouvelle"}
                                {item[column.toLowerCase()] === 1 &&
                                  "En attente"}
                                {item[column.toLowerCase()] === 2 && "Complet"}
                              </span>
                            </td>
                          );
                        case "prix":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {formatPrice(item[column.toLowerCase()])}
                              </div>
                            </td>
                          );
                        default:
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {item[column.toLowerCase()]}
                              </div>
                            </td>
                          );
                      }
                    })}

                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left">
                        <EditMenu className="relative inline-flex">
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                              to={`/admin/${name}/${item.id}`}
                            >
                              Voir
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                              to={`/admin/orders/${item.id}/edit`}
                              // to={`/admin/${name}/${
                              //   name === "products"
                              //     ? item.designation
                              //     : item.id
                              // }/edit`}
                            >
                              Editer
                            </Link>
                          </li>
                          {name !== "customers" && (
                            <li>
                              <button
                                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                                onClick={() => deleteItem(item.id)}
                              >
                                Supprimer
                              </button>
                            </li>
                          )}
                        </EditMenu>
                      </div>
                    </td>
                  </tr>
                );
              })
            : sliceData.map((item) => {
                return (
                  <tr key={item.id}>
                    {columns.map((column, index) => {
                      switch (column.toLowerCase()) {
                        case "role":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {item[column.toLowerCase()]["role"]}
                              </div>
                            </td>
                          );
                        case "image":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                <img
                                  className="w-10 h-10 rounded-md"
                                  src={item[column.toLowerCase()]}
                                />
                              </div>
                            </td>
                          );
                        case "montant":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {formatPrice(item[column.toLowerCase()])}
                              </div>
                            </td>
                          );
                        case "date":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800 capitalize">
                                {moment(item[column.toLowerCase()]).format(
                                  "ll"
                                )}
                              </div>
                            </td>
                          );
                        case "statut":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <span
                                onClick={() => changeStatus(item["id"])}
                                className={`inline-flex cursor-pointer items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none ${
                                  item[column.toLowerCase()]
                                    ? "bg-green-600 text-green-100"
                                    : "bg-yellow-600 text-yellow-100"
                                } rounded-full`}
                              >
                                {item[column.toLowerCase()] === 0 && "Nouvelle"}
                                {item[column.toLowerCase()] === 1 &&
                                  "En attente"}
                                {item[column.toLowerCase()] === 2 && "Complet"}
                              </span>
                            </td>
                          );
                        case "prix":
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {formatPrice(item[column.toLowerCase()])}
                              </div>
                            </td>
                          );
                        default:
                          return (
                            <td key={index} className="p-2 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {item[column.toLowerCase()]}
                              </div>
                            </td>
                          );
                      }
                    })}

                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-left">
                        <EditMenu className="relative inline-flex">
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                              to={`/admin/${name}/${item.id}`}
                            >
                              Voir
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                              to={`/admin/${name}/${
                                name === "products" ? item.designation : item.id
                              }/edit`}
                            >
                              Editer
                            </Link>
                          </li>
                          {name !== "customers" && (
                            <li>
                              <button
                                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                                onClick={() => deleteItem(item.id)}
                              >
                                Supprimer
                              </button>
                            </li>
                          )}
                        </EditMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {pageCount > 1 && (
        <Pagination pageCount={pageCount} changePage={changePage} />
      )}
    </>
  ) : (
    <TableLoader />
  );
};
