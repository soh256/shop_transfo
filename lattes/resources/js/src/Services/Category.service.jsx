import { BaseUrl, headers, headersFormdata } from "./Config";
import axios from "axios";

const AllRed = () => {
    return axios.get(BaseUrl + "categories", headers);
};

const All = () => {
    return axios
        .get(BaseUrl + "categories", headers)
        .then((response) => response.data);
};

const Add = (formData) => {
    return axios
        .post(BaseUrl + "categories", formData, headersFormdata)
        .then((response) => response);
};

const Update = (id, formData) => {
    return axios
        .post(BaseUrl + "categories/"+ id + "?__method=PUT", formData, headersFormdata)
        .then((response) => response);
};
const Delete = (id) => {
    return axios
        .delete(BaseUrl + "categories/" + id, headers)
        .then((response) => response.data);
};

export default { All, Add, Delete, AllRed, Update };
