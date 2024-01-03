import * as ActionType from "../../actions/category/ActionType";

const INITIALSTATE = {
	loading: true,
	data:[]
};

export default function(state = INITIALSTATE, action)
{
	const { type, payload} = action;
	switch(type)
	{
		case ActionType.GET_ALL_CATEGORYS:
			return {
				...state,
				data: payload
			}
		case ActionType.LOADING_CATEGORYS:
			return {
				...state,
				loading: true
			}
		case ActionType.LOADED_CATEGORYS:
			return {
				...state,
				loading: false
			}
		default:
			return state;
	}
}