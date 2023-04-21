//Создание экшенов, связанных с созданием заказа

//Импорты
import { WsOrderType } from "../../types/types";
import {
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDER_FROM_API,
    ORDER_CLEAR,
} from "./actionsTypes";

//Типы экшенов
type GetOrderActionType = {
    type: typeof GET_ORDER;
};

type GetOrderFailedActionType = {
    type: typeof GET_ORDER_FAILED;
    errorName: string;
};

type GetOrderSuccessActionType = {
    type: typeof GET_ORDER_SUCCESS;
    number: number;
};

type GetOrderFromApiType = {
    type: typeof GET_ORDER_FROM_API;
    order: WsOrderType;
};

type OrderClear = {
    type: typeof ORDER_CLEAR;
};

export type OrderActionsTypes =
    | GetOrderActionType
    | GetOrderFailedActionType
    | GetOrderSuccessActionType
    | GetOrderFromApiType
    | OrderClear;

//Экшены

//Экшен запроса заказа
export const getOrderAction = (): GetOrderActionType => ({ type: GET_ORDER });

//Экшен при неудчаной попытки получить сделать заказ
export const getOrderFailedAction = (
    errorName: string
): GetOrderFailedActionType => ({
    type: GET_ORDER_FAILED,
    errorName: errorName,
});

//Экшен при удачной попытки получить заказ
export const getOrderSuccessAction = (
    payload: number
): GetOrderSuccessActionType => ({
    type: GET_ORDER_SUCCESS,
    number: payload,
});

//Получение заказа из API
export const getOrderFromApiAction = (
    payload: WsOrderType
): GetOrderFromApiType => ({
    type: GET_ORDER_FROM_API,
    order: payload,
});

export const orderClear = (): OrderClear => ({
    type: ORDER_CLEAR,
});
