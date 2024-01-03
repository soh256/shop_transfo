import { BaseUrl, headers } from "./Config";


const Update = (data) => {
    return axios
        .put(BaseUrl + "users/edit", data, headers)
        .then((response) => response.data);
};

export default { Update };