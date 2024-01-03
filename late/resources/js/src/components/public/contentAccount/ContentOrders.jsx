import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Input from "@material-tailwind/react/Input";
import CustomerService from "../../../Services/Customer";
import AuthService from "../../../Services/Auth.service";
import swal from "sweetalert";
import Message from "../../../redux/actions/message/Message";
import { formatPrice } from "../../../helpers/format";
import moment from "moment";
import { EditMenu } from "../../partials/actions";
import { Link } from "react-router-dom";
import OrderService from "../../../Services/Order.service.js";
import CustumerService from "../../../Services/Customer";

const userFormatedProperty = {
  nom: "first_name",
  prenom: "last_name",
  tel: "phone",
  ville: "city",
  email: "email",
};

export const ContentOrders = ({ data, columns, setUser }) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = (id) => {
    swal({
      title: "Êtes-vous sûr?",
      text: "Une fois annulé, cette commande ne vous appartiendra plus!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);
        try {
          const deleted = (async () => {
            try {
              const { data } = await OrderService.Canceled(id);
              const { data: custumData } = await CustumerService.Me();
              setUser(custumData);
              // console.log(custumData);
              setLoading(false);
              const refreshPage = (async () => {
                location.reload();
              })();
              return data;
            } catch ({ response }) {
              setLoading(false);
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

  return (
    <table className="table-auto w-full bg-gray-200">
      <thead className="text-xs font-semibold lg:uppercase text-gray-800 bg-gray-200">
        {columns.map((column, index) => (
          <th key={index} className="lg:p-2 lg:whitespace-nowrap ">
            <div className="font-semibold tracking-tighter text-left lg:pl-16 2xl:pl-28">
              {column}
            </div>
          </th>
        ))}
      </thead>
      {/* Table body */}
      <tbody className="text-xs lg:text-sm divide-y divide-gray-100">
        {data.map((order, i) => {
          return order.canceled === 0 ? (
            <tr key={i} className=" bg-gray-100">
              {columns.map((column, index) => {
                switch (column) {
                  case "Numero":
                    return (
                      <td
                        key={index}
                        className="py-2 text-center tracking-tighter lg:px-2  border-b border-white text-xs "
                      >
                        {order["order_number"]}
                      </td>
                    );
                  case "Montant":
                    return (
                      <td
                        key={index}
                        className="py-2 text-center  lg:px-2 tracking-tighter border-b border-white text-xs mr-1"
                      >
                        {formatPrice(order["total_amount"])}
                      </td>
                    );
                  case "Status":
                    return (
                      <td key={index} className="p-2 whitespace-nowrap ml-1">
                        <span
                          className={`inline-flex text-center items-center tracking-tighter justify-center px-1 lg:px-2 py-1 mr-2 text-xs font-bold leading-none ${
                            order[column.toLowerCase()]
                              ? "bg-green-600 text-green-100"
                              : "bg-yellow-600 text-yellow-100"
                          } rounded-full`}
                        >
                          {order[column.toLowerCase()] === 0 && "Nouvelle"}
                          {order[column.toLowerCase()] === 1 && "En attente"}
                          {order[column.toLowerCase()] === 2 && "Complet"}
                        </span>
                      </td>
                    );
                  case "Date":
                    return (
                      <td key={index} className="lg:p-2 text-center ">
                        <span className="font-medium text-xs tracking-tighter  text-gray-800 capitalize">
                          {order["created_at"].slice(0, 10)}
                        </span>
                      </td>
                    );
                  default:
                    return (
                      <td
                        key={index}
                        className="py-2 lg:px-2 border-b border-white text-xs text-center "
                      >
                        {/* {order[column.toLowerCase()]} */}
                        <EditMenu className="relative inline-flex">
                          <li>
                            {!loading && (
                              <Link
                                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                                to={`/account/orders/${order.id}`}
                              >
                                Voir
                              </Link>
                            )}
                          </li>
                          <li>
                            <Link
                              className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                              to={`#0`}
                            >
                              Payer
                            </Link>
                          </li>
                          <li>
                            <div
                              onClick={() => deleteItem(order.id)}
                              className="font-medium cursor-pointer text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                            >
                              {" "}
                              Annuler
                            </div>
                          </li>
                        </EditMenu>
                      </td>
                    );
                }
              })}
              <td className="p-2 whitespace-nowrap">
                <div className="text-lg text-left">
                  {/* <EditMenu className="relative inline-flex">
                                        <li>
                                            <Link
                                                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                                                to={`#0`}
                                            >
                                                Voir
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                                                to={`#0`}
                                            >
                                                Payer
                                            </Link>
                                        </li>
                                    </EditMenu> */}
                </div>
              </td>
            </tr>
          ) : null;
        })}
      </tbody>
    </table>
  );
};

const villes = [
  {
    label: "Yaounde",
  },
  {
    label: "Douala",
  },
  {
    label: "Bafoussam",
  },
];
export const Address = () => {
  return (
    <div className="flex flex-col justify-center w-full lg:px-36 py-5 ">
      <div className=" flex justify-center ">
        <div className="w-4/6   flex flex-col justify-center space-y-3 mt-5">
          <p className=" lg:text-xl font-semibold text-yellow-400 capitalize">
            Mes addresses
          </p>
          <div className="w-full">
            <Input
              type="text"
              color="lightBlue"
              size="regular"
              outline={false}
              disabled={true}
              placeholder="email"
            />
          </div>
          <div className="w-full">
            <Input
              type="text"
              color="lightBlue"
              size="regular"
              outline={false}
              disabled={true}
              placeholder="Téléphone"
            />
          </div>
          <div className="mb-3 w-full">
            <Input
              type="text"
              color="lightBlue"
              size="lg"
              outline={false}
              name="adresse"
              // onChange={handleChange}
              // disabled={userState.adresse !== null}
              placeholder="Adresse (Quartier, Rue)"
            />
          </div>
          <div className="mb-3  ">
            <Select
              labelId="filled-select-city"
              label="Ville"
              name="city"
              size="medium"
              // value={user.city}
              // onChange={handleChange}
              variant="standard"
            >
              {villes.map((option, i) => (
                <MenuItem key={i} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <button className="mt-5 bg-yellow-400 hover:bg-yellow-500 border hover:border-none transform transition ease-out px-4 py-2 rounded  text-white font-medium flex focus-within:outline-none">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export const Compte = ({ data }) => {
  const [user, setUser] = useState(data);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let userFormatData = {};
    Object.keys(userFormatedProperty).map((property) => {
      Object.assign(userFormatData, {
        [userFormatedProperty[property]]: user[property],
      });
    });

    try {
      const { data } = await CustomerService.CurrentUpdate(userFormatData);
      setLoading(false);
      setUser(data);
      dispatch(
        Message.setMessageSuccess("Vos information on été mis a jour :)")
      );
    } catch ({ response }) {
      setLoading(false);
      swal(response.data.message, {
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className=" hidden lg:flex h-auto   flex-col lg:flex-row  justify-center items-center ">
        <div
          className="lg:w-full h-auto my-10  flex justify-center "
          onSubmit={handleSubmit}
        >
          <form className="w-3/5 bg-white h-60 lg:mt-16 space-y-5 flex flex-col justify-center mr-24 lg:mr-16">
            <div className="mb-10 space-y-4  shadow px-4 py-1">
              <div className=" hidden lg:flex  text-sm font-semibold text-yellow-400 ">
                <span>Informations Personnel</span>
              </div>
              <div className="  lg:hidden text-sm font-semibold text-yellow-400">
                Informations Personnel
              </div>
              <div className="space-y-10 ">
                <div className=" flex space-x-2 ">
                  <Input
                    value={user?.nom}
                    onChange={handleChange}
                    name="nom"
                    type="text"
                    color="amber"
                    size="sm"
                    outline={false}
                    placeholder="Nom"
                  />
                  <Input
                    value={user?.prenom}
                    onChange={handleChange}
                    name="prenom"
                    type="text"
                    color="amber"
                    size="sm"
                    outline={false}
                    placeholder="Prenom"
                  />
                </div>
                <div className=" flex space-x-2 ">
                  <Input
                    value={user?.tel}
                    onChange={handleChange}
                    name="tel"
                    type="text"
                    color="amber"
                    size="sm"
                    outline={false}
                    placeholder="Telephone"
                  />
                  <Input
                    value={user?.ville}
                    onChange={handleChange}
                    name="ville"
                    type="text"
                    color="amber"
                    size="sm"
                    outline={false}
                    placeholder="Ville"
                  />
                </div>
              </div>
              <div className="flex justify-end items-end">
                <button
                  type="submit"
                  className="flex  border-2 px-5  bg-yellow-400 text-sm font-medium rounded-md  text-white  justify-center items-center py-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
                >
                  Sauvegarder
                </button>
              </div>
            </div>
            <div className="mb-10 space-y-4  shadow lg:px-4 py-1">
              <div className=" hidden lg:flex  text-sm font-semibold text-yellow-400 ">
                <span>Information du compte</span>
              </div>
              <div className="lg:hidden text-sm font-semibold text-yellow-400">
                Information du Compte
              </div>
              <div className="space-y-10 ">
                <div className=" flex ">
                  <Input
                    value={user?.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    color="amber"
                    size="sm"
                    outline={false}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="flex justify-end items-end">
                <button
                  type="submit"
                  className="flex  border-2 px-5  bg-yellow-400 text-sm font-medium rounded-md  text-white  justify-center items-center py-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
                >
                  Sauvegarder
                </button>
              </div>
            </div>{" "}
          </form>
        </div>
      </div>
      <div className=" flex lg:hidden h-auto w-full  flex-col  justify-center items-center p-2">
        <form
          className=" space-y-5 flex flex-col justify-center px-4 "
          onSubmit={handleSubmit}
        >
          <div className="mb-10 space-y-2 lg:space-y-4 py-1 shadow px-4">
            <div className=" hidden lg:flex  text-sm font-semibold text-yellow-400 ">
              <span>Informations Personnel</span>
            </div>
            <div className="  lg:hidden text-sm font-semibold text-yellow-400">
              Informations Personnel
            </div>
            <div className=" space-y-2 lg:space-y-10 ">
              <div className=" flex flex-col space-y-2 lg:space-y-0  lg:flex-row ">
                <Input
                  value={user?.nom}
                  onChange={handleChange}
                  name="nom"
                  type="text"
                  color="amber"
                  size="sm"
                  outline={false}
                  placeholder="Nom"
                />{" "}
                <Input
                  value={user?.prenom}
                  onChange={handleChange}
                  name="prenom"
                  type="text"
                  color="amber"
                  size="sm"
                  outline={false}
                  placeholder="Prenom"
                />
              </div>
              <div className=" flex flex-col space-y-2 lg:space-y-0  lg:flex-row ">
                <Input
                  value={user?.tel}
                  onChange={handleChange}
                  name="tel"
                  type="text"
                  color="amber"
                  size="sm"
                  outline={false}
                  placeholder="Telephone"
                />{" "}
                <Input
                  value={user?.ville}
                  onChange={handleChange}
                  name="ville"
                  type="text"
                  color="amber"
                  size="sm"
                  outline={false}
                  placeholder="Ville"
                />
              </div>
            </div>
            <div className="flex justify-end items-end">
              <button
                type="submit"
                className="flex  border-2 px-5  bg-yellow-400 text-sm font-medium rounded-md  text-white  justify-center items-center py-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
              >
                Sauvegarder
              </button>
            </div>
          </div>
          <div className="mb-10 space-y-4   lg:px-4 py-1 shadow px-4 ">
            <div className=" hidden lg:flex  text-sm font-semibold text-yellow-400 ">
              <span>Information du compte</span>
            </div>
            <div className="  lg:hidden text-sm font-semibold text-yellow-400">
              Information du Compte
            </div>
            <div className="space-y-10 ">
              <div className=" flex ">
                <Input
                  value={user?.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  color="amber"
                  size="sm"
                  outline={false}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="flex justify-end items-end">
              <button
                type="submit"
                className="flex  border-2 px-5  bg-yellow-400 text-sm font-medium rounded-md  text-white  justify-center items-center py-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export const Password = ({ id }) => {
  const [credential, setCredential] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCredential({ ...credential, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await AuthService.CurrentUserPasswordReset(
        credential,
        id
      );
      setLoading(false);
      dispatch(
        Message.setMessageSuccess("Vos information on été mis a jour :)")
      );
    } catch ({ response }) {
      setLoading(false);
      swal(response.data.message, {
        icon: "error",
      });
    }
  };

  return (
    <div className=" h-auto  flex flex-col lg:flex-row  justify-center items-center ">
      <div className="lg:w-full h-auto my-10  flex justify-center ">
        <form
          className="lg:w-3/5 bg-white h-60 lg:mt-16 space-y-5 flex flex-col justify-center lg:mr-16"
          onSubmit={handleSubmit}
        >
          <div className=" hidden lg:flex justify-center text-2xl font-semibold text-yellow-400 pt-5 ">
            <span>Modification de mot de passe</span>
          </div>
          <div className="  lg:hidden text-xl font-semibold text-yellow-400">
            <span>Modification de mot de passe</span>
          </div>
          <div className=" mb-10 space-y-5 p-4 shadow ">
            <Input
              name="current"
              type="password"
              onChange={handleChange}
              color="amber"
              size="sm"
              outline={false}
              placeholder="Mot de passe actuel"
            />
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              color="amber"
              size="sm"
              outline={false}
              placeholder=" Nouveau Mot de passe"
            />
            <Input
              name="c_password"
              type="password"
              onChange={handleChange}
              color="amber"
              size="sm"
              outline={false}
              placeholder="Confirmer Nouveau Mot de passe"
            />
            <button
              type="submit"
              className="flex w-full  border-2 space-x-3  bg-yellow-300 text-sm font-medium rounded-md  text-white  justify-center items-center p-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
