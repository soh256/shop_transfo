import { BaseUrl, headers, headersFormdata } from "./Config";
import axios from "axios";

const All = () => {
    return axios
        .get(BaseUrl + "features", headers)
        .then((response) => response.data);
};

const Get = (id) => {
    return axios
        .get(BaseUrl + "features/" + id, { headers })
        .then((response) => response.data);
};

const Add = (formData) => {
    return axios
        .post(BaseUrl + "features", formData, headersFormdata)
        .then((response) => response.data);
};

const Delete = (id) => {
    return axios
        .delete(`${BaseUrl}features/${id}`, headers)
        .then((response) => response.data);
};
export default { All, Get, Add, Delete };
