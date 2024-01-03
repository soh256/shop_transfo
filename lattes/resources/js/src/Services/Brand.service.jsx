import { BaseUrl, headers, headersFormdata } from "./Config";
import axios from "axios";

const All = () => {
    return axios
        .get(BaseUrl + "brands", headers)
        .then((response) => response.data);
};

const Add = (formData) => {
    return axios
        .post(BaseUrl + "brands", formData, headersFormdata)
        .then((response) => response);
};

const Update = (id, formData) => {
    return axios
        .post(BaseUrl + "brands/"+ id + "?__method=PUT", formData, headersFormdata)
        .then((response) => response);
};

const Delete = (id) => {
    return axios
        .delete(BaseUrl + "brands/" + id, headers)
        .then((response) => response.data);
};

export default { All, Add, Delete, Update};
