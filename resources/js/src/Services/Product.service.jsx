import { BaseUrl, headers, headersFormdata } from "./Config";
import axios from "axios";

const AllRed = () => {
    return axios.get(BaseUrl + "products", headers);
};

const All = () => {
    return axios
        .get(BaseUrl + "products", headers)
        .then((response) => response.data);
};

const Get = (designation) => {
    return axios
        .get(BaseUrl + "products/" + designation, headers)
        .then((response) => response.data);
};

const Add = (formData) => {
    return axios
        .post(BaseUrl + "products", formData, headersFormdata)
        .then((response) => response.data);
};

const Update = (formData, designation) => {
    return axios
        .post(
            `${BaseUrl}products/${designation}?__method=PUT`,
            formData,
            headersFormdata
        )
        .then((response) => response.data);
};

const Delete = (id) => {
    return axios
        .delete(`${BaseUrl}products/${id}`, headers)
        .then((response) => response.data);
};

const DeleteImage = (product, image) => {
    return axios
        .delete(`${BaseUrl}products/${product}/images/${image}`, headers)
        .then((response) => response.data);
};

const AddImage = (product, image) => {
    return axios
        .post(`${BaseUrl}products/${product}/images`, image, headersFormdata)
        .then((response) => response.data);
};
export default { All, Get, Add, Update, Delete, AllRed, DeleteImage, AddImage };
