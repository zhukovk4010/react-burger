//Reducer списка заказов

//Импорты
import { OrderActionsTypes } from "./../actions/order";
import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
} from "../../utils/constants";

//Тип состояния
type InitialStateType = {
    orderData: { name: string; numberOrder: number } | null;
    isLoading: boolean;
    hasError: boolean;
    errorName: string;
};

//Начальное состояние
const initialState: InitialStateType = {
    orderData: null,
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
                orderData: {
                    name: action.name,
                    numberOrder: action.numberOrder,
                },
                isLoading: false,
                hasError: false,
            };
        case GET_ORDER_FAILED:
            return {
                ...state,
                orderData: null,
                hasError: true,
                errorName: action.errorName,
            };
        default:
            return state;
    }
};

export default ordersReducer;
