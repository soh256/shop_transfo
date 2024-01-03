import { BaseUrl, headers, headersFormdata } from "./Config";
import axios from "axios";

const All = () => {
    return axios
        .get(BaseUrl + "users", headers)
        .then((response) => response.data);
};

const Get = (id) => {
    return axios
        .get(`${BaseUrl}users/${id}`, headers)
        .then((response) => response.data);
};

const Me = () => {
    return axios
        .get(`${BaseUrl}users/current`, headers)
        .then((response) => response.data);
};

const Update = (id, data) => {
    return axios
        .put(`${BaseUrl}users/${id}/edit`, data, headers)
        .then((response) => response.data);
};

const CurrentUpdate = (data) => {
    return axios
        .put(`${BaseUrl}users/edit`, data, headers)
        .then((response) => response.data);
}

const Add = (data) => {
    return axios
        .post(`${BaseUrl}users/create`, data, headers)
        .then((response) => response.data);
};

export default { All, Get, Me,Add, Update, CurrentUpdate };
