import {
	ADD_CATEGORY,
	DELETE_CATEGORY,
	EDITE_CATEGORY,
	GET_CATEGORY,
	GET_ALL_CATEGORYS,
	LOADING_CATEGORYS,
	LOADED_CATEGORYS,
} from "./ActionType";
import CategoryService from "../../../Services/Category.service";

const fetchCategory =()=>(dispatch)=>{
	dispatch({
		type:LOADING_CATEGORYS,
	});
	return CategoryService.AllRed().then(
			(response) => {
				const {data} = response.data;
				dispatch({
					type:LOADED_CATEGORYS,
				});
				dispatch({
					type: GET_ALL_CATEGORYS,
					payload: data,
				});
				return Promise.resolve();
			},
			(error) =>{
				dispatch({
					type:LOADED_CATEGORYS,
				});
				console.log(error.response);
				return Promise.reject();
			}
	);
}
export default {
	fetchCategory,
}