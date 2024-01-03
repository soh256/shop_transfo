import {
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_ERROR,
    SET_MESSAGE_INFO,
    CLEAR_MESSAGE,
} from "./ActionType";

const setMessageError = (message) => ({
    type: SET_MESSAGE_ERROR,
    payload: message,
});
const setMessageInfo = (message) => ({
    type: SET_MESSAGE_INFO,
    payload: message,
});
const setMessageSuccess = (message) => ({
    type: SET_MESSAGE_SUCCESS,
    payload: message,
});

const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});

export default {
    setMessageError,
    setMessageInfo,
    setMessageSuccess,
    clearMessage,
};
