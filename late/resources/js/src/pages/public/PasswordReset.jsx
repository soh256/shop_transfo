import React, {useCallback, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Input from "@material-tailwind/react/Input";
import AuthService from "../../Services/Auth.service";
import swal from "sweetalert";
import message from "../../redux/actions/message/Message";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const PasswordReset = () => {
    const [newData, setNewData] = useState({password:"", c_password:""})
    const [loading, setLoading] = useState(false)

    const onChange = ({target}) => {
        const {name, value} = target
        setNewData({...newData, [name]: value})
    }

    const { token } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const setTokenToData= useCallback(()=>{
        setNewData({...newData, token:token})
    }, [token])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await AuthService.ResetPassword(newData)
            setLoading(false)
            dispatch(message.setMessageSuccess('Connecter vous avec votre nouveau mot de passe :)'))
            history.push('/account/login')
        }catch ({response}) {
            setLoading(false)
            swal(response.data.message, {
                icon: "error",
            });
        }

    }
    useEffect(()=>{
        setTokenToData()
    }, [token])

    return (
        <div className=" h-screen  flex flex-col lg:flex-row  justify-center items-center ">
            <div className="lg:w-full h-auto my-10  flex justify-center ">
                <form
                    className="lg:w-3/5 bg-white h-60 lg:mt-16 space-y-5 flex flex-col justify-center lg:mr-16"
                    onSubmit={handleSubmit}
                >
                    <div className=" hidden lg:flex justify-center text-2xl font-semibold text-yellow-400 pt-5 ">
                        <span>Reinitialiser le mot de passe</span>
                    </div>
                    <div className=" mb-10 space-y-5 p-4 shadow ">
                        <div className="flex  w-full">
                            <Input
                                type="password"
                                name="password"
                                color="amber"
                                size="sm"
                                outline={false}
                                onChange={ (e) => onChange(e)}
                                placeholder=" Nouveau Mot de passe"
                            />

                            <i className="mt-3 transition duration-200 ease-in-out">
                                {/* {eye} */}
                            </i>
                        </div>{" "}
                        <div className="flex  w-full">
                            <Input
                                type="password"
                                name="c_password"
                                color="amber"
                                size="sm"
                                outline={false}
                                onChange={ (e) => onChange(e)}
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
