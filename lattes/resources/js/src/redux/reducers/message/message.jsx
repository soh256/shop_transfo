import {
    CLEAR_MESSAGE,
    SET_MESSAGE_ERROR,
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_INFO,
} from "../../actions/message/ActionType";
const initialState = { success: "", error: "", info: "" };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE_SUCCESS:
            return { ...state, success: payload };
        case SET_MESSAGE_INFO:
            return { ...state, info: payload };
        case SET_MESSAGE_ERROR:
            return { ...state, error: payload };

        case CLEAR_MESSAGE:
            return { success: "", error: "", info: "" };
        default:
            return state;
    }
}
