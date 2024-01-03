import * as actionTypes from "../../actions/cart/ActionType";

const saveToLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
};
const INITIALSTATE = {
    cart:
        localStorage.getItem("cart") !== null
            ? JSON.parse(localStorage.getItem("cart"))
            : [],
    currentItem: null,
};

export default function (state = INITIALSTATE, action){
    const { type, payload } = action;

    switch (type) {
        case actionTypes.ADD_TO_CART:
            //check if item is in the cart
            const inCart = state.cart.some(
                (item) => item.id == payload.item.id
            );
            //check if item.qteStock == 0 or qte > qteStock
            if(payload.item.qte_stock === 0 || payload.qte > payload.item.qte_stock)
            {
                return state;
            }
            // if is in, thend i copy the state and i increase it else i put it in the cart
            return {
                ...state,
                cart: inCart
                    ? state.cart.map((item) =>
                          item.id === payload.item.id
                              ? { ...item, qte: item.qte + payload.qte }
                              : item
                      )
                    : [...state.cart, { ...payload.item, qte: payload.qte }],
            };
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== payload.id),
            };
        case actionTypes.AJUST_QTE:
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === payload.item.id
                        ? { ...item, qte: payload.qte }
                        : item
                ),
            };

        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: payload,
            };
        case actionTypes.CLEAN_CART:
                    return {
                        ...state,
                        cart: [],
                    };

        case actionTypes.SAVE_TO_LOCALSTORAGE:
            saveToLocalStorage(payload);
            return state;
        default:
            return state;
    }
}
