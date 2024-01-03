import React, { useEffect, useState } from "react";
import Input from "@material-tailwind/react/Input";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect, useDispatch, useSelector } from "react-redux";
import Auth from "../../redux/actions/auth/Auth";
import message from "../../redux/actions/message/Message";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} color="gray" />;

const Login = ({ history, user, isLoggedIn }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setCredentials({ ...credentials, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(Auth.login(credentials))
            .then(() => {
                dispatch(message.setMessageSuccess(`Bienvenue :)`));
                history.push("/");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(message.setMessageInfo(`Vous êtes déjà connecter !!!`));
            return history.push("/");
        }
    }, []);

    return (
        <div className="bg-white w-full h-auto  flex justify-center lg:items-center -mt-16 static">
            <div className=" h-auto  flex my-40 flex-col lg:flex-row  justify-center mt-20 lg:mt-0 ">
                <div className="lg:w-1/2 border-r-2 border-opacity-50 h-auto my-10 flex justify-end ">
                    <form
                        onSubmit={handleSubmit}
                        className="w-3/5 bg-white h-60 lg:mt-5 space-y-5 flex flex-col justify-center mx-20 lg:mr-16"
                    >
                        <div className=" hidden lg:block text-2xl font-semibold text-yellow-400">
                            {" "}
                            Connectez vous
                        </div>{" "}
                        <div className="  lg:hidden text-xl font-semibold text-yellow-400">
                            {" "}
                            Connectez vous
                        </div>
                        <div className="">
                            <Input
                                value={credentials.email}
                                name="email"
                                type="email"
                                color="amber"
                                size="sm"
                                outline={false}
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex  w-full">
                            <Input
                                value={credentials.password}
                                name="password"
                                type={passwordShown ? "text" : "password"}
                                color="amber"
                                size="sm"
                                outline={false}
                                placeholder="Entrez le mot de passe"
                                onChange={handleChange}
                            />
                            {credentials.password && (
                                <i
                                    onClick={togglePasswordVisiblity}
                                    className="mt-3 transition duration-200 ease-in-out"
                                >
                                    {eye}
                                </i>
                            )}
                        </div>
                        <div className="flex lg:justify-center lg:-mt-10 ">
                            <div className="flex justify-end space-x-4">
                                <Link
                                    to="/password/reset"
                                    className="text-sm text-yellow-500v transition duration-200 ease-in-out hover:text-yellow-600"
                                >
                                    Mot de passe oublier ?
                                </Link>
                            </div>
                        </div>
                        <div className="">
                            <button
                                disabled={loading}
                                type="submit"
                                className="flex w-full  border-2 space-x-3  bg-yellow-300 text-sm font-medium rounded-md  text-white  justify-center items-center p-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
                            >
                                {loading && "Loading..."}
                                {!loading && "Se Connecter"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="lg:w-1/2  h-auto my-10 flex justify-center lg:justify-start lg:ml-16">
                    <form className="w-3/5 bg-white h-60 mt-5 space-y-6 flex flex-col justify-center ">
                        <div className="hidden lg:block text-2xl font-semibold text-yellow-400">
                            {" "}
                            Créer votre compte
                        </div>
                        <div className="lg:hidden text-xl font-semibold text-yellow-400">
                            {" "}
                            Créer votre compte
                        </div>

                        <div className="">
                            <a>
                                Créer votre compte Shop.Transfo en seulement
                                quelques clicks ! Ainsi vous profiterez des
                                offres en produits et services que vous propose
                                Shop.Transfo.
                            </a>
                        </div>
                        <div
                            className="flex space-x-8 w-full
                "
                        ></div>

                        <div className="">
                            <Link
                                to="/account/register"
                                className="flex w-full  border-2 space-x-3  bg-yellow-300 rounded-md  text-white  justify-center items-center p-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
                            >
                                <span className="text-sm font-medium">
                                    Creer un Compte
                                </span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    };
};
export default connect(mapStateToProps)(Login);
