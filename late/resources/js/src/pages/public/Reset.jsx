import React, { useState } from "react";
import Input from "@material-tailwind/react/Input";
import { Link, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import AuthService from "../../Services/Auth.service";
import swal from "sweetalert";

export const Reset = () => {
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await AuthService.ForgotPassword({
                email: getValues("email"),
            });
            setLoading(false);
            swal(
                "Un mail a été envoyer à votre adresse, n'hésite pas de regarder dans les spam :)",
                {
                    icon: "success",
                }
            );
            history.push("/account/login");
        } catch ({ response }) {
            swal(response.data.message, {
                icon: "error",
            });
            setLoading(false);
        }
    };
    return (
        <>
            <div className="bg-white w-full min-h-screen flex  space-x-8 justify-center mt-8 px-4 lg:px-0 text-gray-800  lg:mt-10">
                <div className=" px-4 lg:px-0 lg:w-2/5 bg-white h-60 mt-5 space-y-5 flex flex-col ">
                    <div className="text-2xl font-semibold text-yellow-400 flex justify-center">
                        Mot de passe oublié
                    </div>
                    <div className="flex space-x-2">
                        <div className="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6  text-yellow-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            Veillez entrer l'adresse Email associée a votre
                            compte Transfo-vente. Nous vous enverrons un lien
                            via cette adresse afin de reinitialiser votre
                            compte.
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            defaultValues=""
                            name="email"
                            rules={{
                                required:
                                    "L'email est obligatoire pour la réinitialisation",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "La valeur saisie ne correspond pas au format de l'email",
                                },
                            }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    type="email"
                                    color="amber"
                                    size="sm"
                                    outline={true}
                                    value={getValues("email") ?? ""}
                                    placeholder="Email"
                                    onChange={onChange}
                                    error={errors.email?.message}
                                />
                            )}
                        />
                        <button
                            disabled={loading}
                            type="submit"
                            className="flex w-full mt-5 border-2 space-x-3  bg-yellow-300 rounded-md  text-white  justify-center items-center p-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
                        >
                            <span className="text-sm font-medium">
                                {loading && "En cour d'envoie..."}
                                {!loading && "M'envoyer les instructions"}
                            </span>
                        </button>
                    </form>
                    <div className="flex justify-center lg:-mt-10 ">
                        <div className="flex space-x-4">
                            <Link
                                to="/account/login"
                                className="text-sm text-yellow-300 hover:text-yellow-500 transition duration-200 ease-in-out  transform hover:-translate-x-1 hover:-translate-y-2 hover:scale-110 "
                            >
                                Retourner à la connexion
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
