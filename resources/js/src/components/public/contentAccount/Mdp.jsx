import React from "react";

export const ResetPAssword = () => {
    return (
        <div className=" h-auto  flex flex-col lg:flex-row  justify-center items-center ">
            <div className="lg:w-full h-auto my-10  flex justify-center ">
                <form className="lg:w-3/5 bg-white h-60 lg:mt-16 space-y-5 flex flex-col justify-center lg:mr-16">
                    <div className=" hidden lg:flex justify-center text-2xl font-semibold text-yellow-400 pt-5 ">
                        <span>Reinitialiser le mot de passe</span>{" "}
                    </div>
                    <div className=" mb-10 space-y-5 p-4 shadow ">
                        <div className="flex  w-full">
                            <Input
                                name="password"
                                color="amber"
                                size="sm"
                                outline={false}
                                placeholder=" Nouveau Mot de passe"
                            />

                            <i className="mt-3 transition duration-200 ease-in-out">
                                {/* {eye} */}
                            </i>
                        </div>{" "}
                        <div className="flex  w-full">
                            <Input
                                name="password"
                                color="amber"
                                size="sm"
                                outline={false}
                                placeholder="Confirmer Nouveau Mot de passe"
                            />

                            <i className="mt-3 transition duration-200 ease-in-out">
                                {/* {eye} */}
                            </i>
                        </div>
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
