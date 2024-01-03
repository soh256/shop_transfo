import * as ActionType from "../../actions/product/ActionType";
import ProductService from "../../../Services/Product.service"

const INITIALSTATE = {
	loading: true,
	data:[]
};

export default function(state = INITIALSTATE, action)
{
	const { type, payload} = action;
	switch(type)
	{
		case ActionType.GET_ALL_PRODUCTS:
			return {
				...state,
				data: payload
			}
		case ActionType.LOADING_PRODUCTS:
			return {
				...state,
				loading: true
			}
		case ActionType.LOADED_PRODUCTS:
			return {
				...state,
				loading: false
			}
		default:
			return state;
	}
}