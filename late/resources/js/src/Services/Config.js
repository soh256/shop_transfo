import { useSelector } from "react-redux";
export const BaseUrl = "https://shop.transfoafricainc.com/api/v1/";

const token =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user")).token
    : null;
export const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? "Bearer " + token : null,
  },
};
export const headersFormdata = {
  headers: {
    "Content-Type": "application/form-data",
    Accept: "application/json",
    Authorization: token ? "Bearer " + token : null,
  },
};
