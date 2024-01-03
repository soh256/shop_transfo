import {
	ADD_PRODUCT,
	DELETE_PRODUCT,
	EDITE_PRORDUCT,
	GET_PRODUCT,
	GET_ALL_PRODUCTS,
	LOADING_PRODUCTS,
	LOADED_PRODUCTS,
} from "./ActionType";
import ProductService from "../../../Services/Product.service";

const fetchProduct =()=>(dispatch)=>{
	dispatch({
		type:LOADING_PRODUCTS,
	});
	return ProductService.AllRed().then(
			(response) => {
				const {data} = response.data;
				dispatch({
					type:LOADED_PRODUCTS,
				});
				dispatch({
					type: GET_ALL_PRODUCTS,
					payload: data,
				});
				return Promise.resolve();
			},
			(error) =>{
				dispatch({
					type:LOADED_PRODUCTS,
				});
				console.log(error.response);
				return Promise.reject();
			}
	);
}
export default {
	fetchProduct,
}