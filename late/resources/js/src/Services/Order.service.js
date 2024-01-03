// import { BaseUrl, headers } from "./Config";
// import axios from "axios";

// const All = () => {
//   return axios
//     .get(BaseUrl + "orders", headers)
//     .then((response) => response.data);
// };

// const Get = (id) => {
//   return axios
//     .get(BaseUrl + "orders/" + id, headers)
//     .then((response) => response.data);
// };

// const putStatus = (id, data) => {
//   return axios
//     .put(`${BaseUrl}orders/${id}/status`, data, headers)
//     .then((response) => response.data);
// };

// const Canceled = (id) => {
//   return axios
//     .put(`${BaseUrl}orders/${id}/canceled`, null, headers)
//     .then((response) => response.data);
// };

// const Add = (data) => {
//   return axios
//     .post(BaseUrl + "orders", data, headers)
//     .then((response) => response.data);
// };

// const Delete = (id) => {
//   return axios
//     .delete(`${BaseUrl}orders/${id}`, headers)
//     .then((response) => response.data);
// };
// export default { All, Get, Add, Delete, putStatus, Canceled };

import { BaseUrl, headers } from "./Config";
import axios from "axios";

const All = () => {
  return axios
    .get(BaseUrl + "orders", headers)
    .then((response) => response.data);
};

const Get = (id) => {
  return axios
    .get(BaseUrl + "orders/" + id, headers)
    .then((response) => response.data);
};

const putStatus = (id, data) => {
  return axios
    .put(`${BaseUrl}orders/${id}/status`, data, headers)
    .then((response) => response.data);
};

const Canceled = (id) => {
  return axios
    .put(`${BaseUrl}orders/${id}/canceled`, null, headers)
    .then((response) => response.data);
};

const Add = (data) => {
  return axios
    .post(BaseUrl + "orders", data, headers)
    .then((response) => response.data);
};

const Delete = (id) => {
  return axios
    .delete(`${BaseUrl}orders/${id}`, headers)
    .then((response) => response.data);
};

const DeleteOrderProduct = (orderId, productId) => {
  return axios
    .delete(`${BaseUrl}orders/${orderId}/product/${productId}/delete`, headers)
    .then((response) => response.data);
};
export default {
  All,
  Get,
  Add,
  Delete,
  putStatus,
  Canceled,
  DeleteOrderProduct,
};
