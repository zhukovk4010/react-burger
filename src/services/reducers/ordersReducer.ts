import { WsOrderType } from "../../types/types";
import {
    WS_CLOSE,
    WS_CONNECTING,
    WS_ERROR,
    WS_MESSAGE,
    WS_OPEN,
} from "../actions/actionsTypes";
import { OrdersTypes } from "./../actions/orders";
//Редюсер заказов

type InitialStateType = {
    wsStatus: string;
    orders: Array<WsOrderType>;
    totalOrders: number;
    totalTodayOrders: number;
    error?: Event;
};

export const initialState: InitialStateType = {
    wsStatus: "OFFLINE",
    orders: [],
    totalOrders: 0,
    totalTodayOrders: 0,
    error: undefined,
};

const wsOrdersReducer = (
    state = initialState,
    action: OrdersTypes
): InitialStateType => {
    switch (action.type) {
        case WS_CONNECTING:
            return {
                ...state,
                wsStatus: "CONNECTING",
            };
        case WS_OPEN:
            return {
                ...state,
                wsStatus: "ONLINE",
            };
        case WS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case WS_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                totalOrders: action.payload.total,
                totalTodayOrders: action.payload.totalToday,
            };
        case WS_CLOSE:
            return {
                ...state,
                wsStatus: "OFFLINE",
                orders: [],
                totalOrders: 0,
                totalTodayOrders: 0,
            };
        default:
            return state;
    }
};

export default wsOrdersReducer;
