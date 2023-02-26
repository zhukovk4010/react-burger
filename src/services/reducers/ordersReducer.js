//Reducer списка заказов

import { GET_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS } from "../../utils/constants";

const initialState = {
    ordersData: [],
    isLoading: false,
    hasError: false
}


const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER:
            return {
                ...state,
                isLoading: true,
                hasError: false,
            }
        case GET_ORDER_SUCCESS: 
            return {
                ...state,
                ordersData: [
                    ...state.ordersData,
                    {name: action.name, numberOrder: action.numberOrder}
                ],
                isLoading: false,
                hasError: false,
            }
        case GET_ORDER_FAILED:
            return {
                ...state,
                ordersData: [],
                hasError: true
            }
        default:
            return state;
    }
}


export default ordersReducer;