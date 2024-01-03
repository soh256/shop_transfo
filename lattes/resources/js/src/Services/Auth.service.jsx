import { BaseUrl, headers } from "./Config";
import axios from "axios";

const register = (user) => {
    return axios.post(BaseUrl + "auth/register", user);
};

const login = (credentials) => {
    return axios.post(BaseUrl + "auth/login", credentials).then((response) => {
        const { data } = response.data;
        if (data.token) {
            localStorage.setItem("user", JSON.stringify(data));
        }

        return data;
    });
};

const ForgotPassword = (data) => {
    return axios
        .post(BaseUrl + "auth/forgot", data, headers)
        .then((response) => response);
};

const ResetPassword = (data) => {
    return axios
        .post(BaseUrl + "auth/reset", data, headers)
        .then((response) => response);
};

const CurrentUserPasswordReset = (data, id) => {
    return axios
        .post(BaseUrl + "auth/reset?id="+id, data, headers)
        .then((response) => response);
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
    ForgotPassword,
    ResetPassword,
    CurrentUserPasswordReset
};
