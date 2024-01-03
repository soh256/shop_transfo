import React, { useEffect, useState } from "react";
import {
  Address,
  Compte,
  Password,
  TabsAccount,
} from "../../components/public";
import CustomerService from "../../Services/Customer";

export const Account = () => {
  const [openTab, setOpenTab] = useState(1);
  const [user, setUser] = useState();

  const fetchData = async () => {
    try {
      const { data } = await CustomerService.Me();

      setUser(data);

      setLoading(false);
    } catch ({ response }) {
      console.log(response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(user);

  return (
    <>
      <div className=" hidden lg:flex bg-gray-100 min-h-screen lg:p-10">
        <div className="flex bg-white shadow-md w-full rounded-md p-4 overflow-hidden">
          <div className=" w-2/6 lg:w-1/6 h-auto">
            <div className="flex items-center justify-center">
              <div className="hidden lg:flex h-40 w-40 rounded-full shadow-md bg-gray-100 "></div>
              <div className="lg:hidden h-20 w-20 rounded-full shadow-md bg-gray-100 "></div>
            </div>
            <nav className="lg:mt-6 flex lg:flex-col">
              <div>
                <button
                  onClick={() => setOpenTab(1)}
                  className={`w-full focus:outline-none  font-thin uppercase ${
                    openTab === 1
                      ? "text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500"
                      : "text-gray-500"
                  } flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500 `}
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                    </svg>
                  </span>
                  <span className=" hidden lg:block mx-4 text-sm font-normal">
                    Dashboard
                  </span>
                </button>
                <button
                  onClick={() => setOpenTab(2)}
                  className={`w-full focus:outline-none  font-thin uppercase ${
                    openTab === 2
                      ? "text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500"
                      : "text-gray-500"
                  } flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500`}
                >
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="hidden lg:block mx-4 text-sm font-normal">
                    Mes Achats
                  </span>
                </button>
                <button
                  // onClick={() => setOpenTab(3)}
                  className={`w-full focus:outline-none  font-thin uppercase ${
                    openTab === 3
                      ? "text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500"
                      : "text-gray-500"
                  } flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500`}
                >
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="hidden lg:block mx-4 text-sm font-normal">
                    Adresses
                  </span>
                </button>
                <button
                  onClick={() => setOpenTab(4)}
                  className={`w-full focus:outline-none  font-thin uppercase ${
                    openTab === 4
                      ? "text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500"
                      : "text-gray-500"
                  } flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500`}
                >
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="hidden lg:block mx-4 text-sm font-normal">
                    Compte
                  </span>
                </button>
                <button
                  onClick={() => setOpenTab(5)}
                  className={`w-full focus:outline-none  font-thin uppercase ${
                    openTab === 5
                      ? "text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500"
                      : "text-gray-500"
                  } flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500`}
                >
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className=" hidden lg:flex mx-4 text-sm font-normal">
                    Mot de passe
                  </span>
                </button>
                <button
                  onClick={() => console.log("deconnexion")}
                  className={`w-full focus:outline-none  font-thin uppercase ${
                    openTab === 6
                      ? "text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500"
                      : "text-gray-500"
                  } flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-blue-500`}
                >
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 m-auto"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="hidden lg:block mx-4 text-sm font-normal">
                    Deconnexion
                  </span>
                </button>
              </div>
            </nav>
          </div>
          <div className="w-full h-auto ml-4">
            <header className="p-4 rounded border w-full text-blue-500 shadow-md mb-4">
              {openTab === 1 && (
                <div className="flex items-center justify-end">
                  <span className="lg:text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                    </svg>
                  </span>
                  <span className="lg:mx-4 text-xs lg:text-sm font-normal">
                    Dashboard
                  </span>
                </div>
              )}
              {openTab === 2 && (
                <div className="flex items-center justify-end">
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">Mes Achats</span>
                </div>
              )}
              {openTab === 3 && (
                <div className="flex items-center justify-end">
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">Mes Adresses</span>
                </div>
              )}
              {openTab === 4 && (
                <div className="flex items-center justify-end">
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">Compte</span>
                </div>
              )}
              {openTab === 5 && (
                <div className="flex items-center justify-end">
                  <span className="text-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">Mot de passe</span>
                </div>
              )}
            </header>
            <main className="">
              {openTab === 1 && <DashboardPartials />}
              {openTab === 2 && (
                <TabsAccount data={user.orders} setUser={setUser} />
              )}
              {openTab === 3 && <AdressePartials />}
              {openTab === 4 && <AccountPartials user={user} />}
              {openTab === 5 && <PasswordPartials id={user.id} />}
            </main>
          </div>
        </div>
      </div>
      <div className="flex  lg:hidden bg-gray-100 h-screen w-full ">
        <div className="flex flex-col bg-white shadow-md w-full rounded-md py-4 space-y-4 overflow-hidden">
          <div className="flex items-center">
            {/* <div className=" w-1/6 flex items-center">
                            <div className="flex items-center justify-center">
                                <div className="lg:hidden h-10 w-10 rounded-full shadow-md bg-gray-100 "></div>
                            </div>
                        </div> */}
            <div className="w-full h-auto ml-4 flex items-center">
              <header className="p-4 rounded border w-screen text-blue-500 shadow-md mb-4">
                {openTab === 1 && (
                  <div className="flex items-center justify-end">
                    {/* <span className="lg:text-left">
                                            <svg
                                                width="20"
                                                height="20"
                                                fill="currentColor"
                                                viewBox="0 0 2048 1792"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                                            </svg>
                                        </span> */}
                    <span className=" text-xs  font-normal">Dashboard</span>
                  </div>
                )}
                {openTab === 2 && (
                  <div className="flex items-center justify-end">
                    {/* <span className="text-left">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span> */}
                    <span className="mx-4 text-sm font-normal">Achats</span>
                  </div>
                )}
                {openTab === 3 && (
                  <div className="flex items-center justify-end">
                    {/* <span className="text-left">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span> */}
                    <span className="mx-4 text-sm font-normal">Adresses</span>
                  </div>
                )}
                {openTab === 4 && (
                  <div className="flex items-center justify-end">
                    {/* <span className="text-left">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span> */}
                    <span className="mx-4 text-sm font-normal">Compte</span>
                  </div>
                )}
                {openTab === 5 && (
                  <div className="flex items-center justify-end">
                    {/* <span className="text-left">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span> */}
                    <span className="mx-4 text-sm font-normal">
                      Mot de passe
                    </span>
                  </div>
                )}
              </header>
            </div>
          </div>

          <nav className="flex ">
            <div className=" flex tracking-widest w-full">
              <button
                onClick={() => setOpenTab(1)}
                className={`w-full focus:outline-none  font-thin  ${
                  openTab === 1
                    ? "text-blue-500 bg-gradient-to-b from-white to-blue-100 border-b-4 border-blue-500"
                    : "text-gray-500"
                } flex items-center justify-center  transition-colors duration-200  hover:text-blue-500 `}
              >
                {/* <span className="text-left">
                                    <svg
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        viewBox="0 0 2048 1792"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                                    </svg>
                                </span> */}

                <span className="  mx-auto text-xs tracking-widest font-normal">
                  Dashboard
                </span>
              </button>
              <button
                onClick={() => setOpenTab(2)}
                className={`w-full focus:outline-none  font-thin  ${
                  openTab === 2
                    ? "text-blue-500 bg-gradient-to-b from-white to-blue-100 border-b-4 border-blue-500"
                    : "text-gray-500"
                } flex items-center  transition-colors duration-200 justify-center hover:text-blue-500`}
              >
                {/* <span className="text-left">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span> */}

                <span className=" mx-auto text-xs tracking-widest font-normal">
                  Achats
                </span>
              </button>
              <button
                onClick={() => setOpenTab(3)}
                className={`w-full focus:outline-none  font-thin ${
                  openTab === 3
                    ? "text-blue-500 bg-gradient-to-b from-white to-blue-100 border-b-4 border-blue-500"
                    : "text-gray-500"
                } flex items-center  transition-colors duration-200 justify-center hover:text-blue-500`}
              >
                {/* <span className="text-left">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span> */}

                <span className="  mx-auto text-xs tracking-widest font-normal">
                  Adresses
                </span>
              </button>
              <button
                onClick={() => setOpenTab(4)}
                className={`w-full focus:outline-none  font-thin  ${
                  openTab === 4
                    ? "text-blue-500 bg-gradient-to-b from-white to-blue-100 border-b-4 border-blue-500"
                    : "text-gray-500"
                } flex items-center transition-colors duration-200 justify-center hover:text-blue-500`}
              >
                {/* <span className="text-left">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span> */}

                <span className=" mx-auto text-xs tracking-widest font-normal">
                  Compte
                </span>
              </button>
              <button
                onClick={() => setOpenTab(5)}
                className={`w-full focus:outline-none  font-thin  ${
                  openTab === 5
                    ? "text-blue-500 bg-gradient-to-b from-white to-blue-100 border-b-4 border-blue-500"
                    : "text-gray-500"
                } flex items-center  transition-colors duration-200 justify-center hover:text-blue-500`}
              >
                {/* <span className="text-left">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span> */}
                <span className=" mx-auto text-xs tracking-widest font-normal">
                  Password
                </span>
              </button>
            </div>
          </nav>

          <main className="mt-4 w-full">
            {openTab === 1 && <DashboardPartials />}
            {openTab === 2 && (
              <div className="w-full mx-2 lg:mx-0">
                <TabsAccount data={user.orders} />
              </div>
            )}
            {openTab === 3 && <AdressePartials />}
            {openTab === 4 && <AccountPartials user={user} />}
            {openTab === 5 && <PasswordPartials id={user.id} />}
          </main>
        </div>
      </div>
    </>
  );
};

const DashboardPartials = () => {
  return (
    <div className="flex items-center w-full h-20 md:w-1/2 space-x-4">
      <div className="w-1/3">
        <div className="shadow-lg px-4 py-6 w-full h-20 md:auto bg-white dark:bg-gray-700 relative">
          <p className="text-2xl text-black   font-bold">12</p>
          <p className="text-gray-400 text-sm"> Total</p>
        </div>
      </div>
      <div className="w-1/3">
        <div className="shadow-lg px-4 py-6 w-full h-20 md:auto bg-white dark:bg-gray-700 relative">
          <p className="text-2xl text-black   font-bold">12</p>
          <p className="text-gray-400 text-sm">Total</p>
        </div>
      </div>
      <div className="w-1/3">
        <div className="shadow-lg px-4 py-6 w-full  h-20 md:auto bg-white dark:bg-gray-700 relative">
          <p className="text-2xl text-black   font-bold">12</p>
          <p className="text-gray-400 text-sm">Total</p>
        </div>
      </div>
    </div>
  );
};

const OrderPartials = (data) => {
  return <TabsAccount data={data} />;
};

const AdressePartials = () => {
  return <Address />;
};

const AccountPartials = ({ user }) => {
  return (
    <div>
      <Compte data={user} />
    </div>
  );
};

const PasswordPartials = ({ id }) => {
  return (
    <div>
      <Password id={id} />
    </div>
  );
};
