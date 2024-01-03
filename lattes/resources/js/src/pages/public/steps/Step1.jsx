import React, { useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Textarea from "@material-tailwind/react/Textarea";
import Input from "@material-tailwind/react/Input";
import Checkbox from "@material-tailwind/react/Checkbox";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import UserService from "../../../Services/User.service";

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
export const Step1 = ({ setActiveStep }) => {
    const [town, setTown] = React.useState("");
    const userState = useSelector((state) => state.auth.user.user);
    const [user, setUser] = useState(userState);
    const [loading, setLoading] = useState(false);

    const handleChange = ({ target }) => {
        setUser({ ...user, [target.name]: target.value });
    };

    const handleSubmit = async () => {
        if (user.adresse !== null && user.city !== null) {
            setLoading(true);
            try {
                const { data } = await UserService.Update({
                    adresse: user.adresse,
                    city: user.city,
                });
                setActiveStep(1);
            } catch ({ response }) {
                swal(response.data.message, { icon: "error" });
                setLoading(false);
            }
        } else {
            setLoading(false);
            swal("Oups! Veuillez completr les informations", {
                icon: "error",
            });
        }
    };
    return (
        <div className="flex flex-col justify-center w-full lg:px-36 py-5 ">
            <p className=" lg:text-xl font-semibold text-yellow-400 capitalize">
                Entrez vos informations de livraisons
            </p>
            <div className="w-full flex flex-col space-y-3 mt-5">
                <div className="w-full">
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={false}
                        disabled={true}
                        value={`${user.first_name} ${user.last_name}`}
                        placeholder="Nom && Prenom"
                    />
                </div>
                <div className="w-full">
                    <Input
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={false}
                        disabled={true}
                        value={user.phone}
                        placeholder="Téléphon"
                    />
                </div>
                <div className="mb-3 w-full">
                    <Input
                        type="text"
                        color="lightBlue"
                        size="lg"
                        outline={false}
                        name="adresse"
                        onChange={handleChange}
                        disabled={userState.adresse !== null}
                        value={user?.adresse}
                        placeholder="Adresse (Quartier, Rue)"
                    />
                </div>
                <div className="mb-3 w-full">
                    <Select
                        labelId="filled-select-city"
                        label="Ville"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                        variant="standard"
                        disabled={userState.city !== null}
                    >
                        {villes.map((option, i) => (
                            <MenuItem key={i} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="mt-5 bg-green-500 px-4 py-2 rounded  text-white font-medium flex focus-within:outline-none"
            >
                Valider
            </button>
        </div>
    );
};
