import * as actionTypes from "./ActionType";

export const addToCart = (item, value = 1) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: { item: item, qte: value },
    };
};

export const removeFromCart = (itemId) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: { id: itemId },
    };
};

export const ajustQte = (item, value) => {
    return {
        type: actionTypes.AJUST_QTE,
        payload: {
            item: item,
            qte: value,
        },
    };
};

export const loadCurrentItem = (item) => {
    return {
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: item,
    };
};

export const saveToLocalStorage = (item) => {
    return {
        type: actionTypes.SAVE_TO_LOCALSTORAGE,
        payload: item,
    };
};

export const cleanCart = () => {
    return {
        type: actionTypes.CLEAN_CART,
    };
};
