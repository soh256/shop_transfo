import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "./ActionType";
import {
    SET_MESSAGE_ERROR,
    SET_MESSAGE_SUCCESS,
    SET_MESSAGE_INFO,
} from "../../actions/message/ActionType";
import AuthService from "../../../Services/Auth.service";

const register = (user) => (dispatch) => {
    return AuthService.register(user).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: response.data.message,
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_ERROR,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

const login = (credentials) => (dispatch) => {
    return AuthService.login(credentials).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });
            dispatch({
                type: SET_MESSAGE_SUCCESS,
                payload: data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.data) ||
                error.message ||
                error.toString();
            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE_ERROR,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};

export default {
    register,
    login,
    logout,
};
