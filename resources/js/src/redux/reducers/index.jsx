import { combineReducers } from "redux";
import auth from "./auth/auth";
import message from "./message/message";
import cart from "./cart/cart";
import products from "./product/product";
import categories from "./category/category";

export default combineReducers({
    auth,
    message,
    shopping: cart,
    products,
    categories,
});
