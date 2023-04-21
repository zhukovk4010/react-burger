//Reducer списка заказов

//Импорты
import { OrderActionsTypes } from "./../actions/order";
import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_FROM_API,
    GET_ORDER_SUCCESS,
    ORDER_CLEAR,
} from "../../utils/constants";
import { WsOrderType } from "../../types/types";

//Тип состояния
type InitialStateType = {
    orderData: WsOrderType | null;
    numberOrder: number;
    isLoading: boolean;
    hasError: boolean;
    errorName: string;
};

//Начальное состояние
const initialState: InitialStateType = {
    orderData: null,
    numberOrder: 0,
    isLoading: false,
    hasError: false,
    errorName: "",
};

const ordersReducer = (
    state = initialState,
    action: OrderActionsTypes
): InitialStateType => {
    switch (action.type) {
        case GET_ORDER:
            return {
                ...state,
                isLoading: true,
                hasError: false,
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                numberOrder: action.number,
                isLoading: false,
                hasError: false,
            };
        case GET_ORDER_FAILED:
            return {
                ...state,
                hasError: true,
                errorName: action.errorName,
            };
        case GET_ORDER_FROM_API:
            return {
                ...state,
                orderData: action.order,
            };
        case ORDER_CLEAR:
            return {
                ...state,
                orderData: null,
            };
        default:
            return state;
    }
};

export default ordersReducer;
