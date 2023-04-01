//Создание экшенов, связанных с созданием заказа

//Импорты
import { OrderType } from "../../types/types";
import {
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from "../../utils/constants";

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
    name: string;
    numberOrder: number;
};

export type OrderActionsTypes =
    | GetOrderActionType
    | GetOrderFailedActionType
    | GetOrderSuccessActionType;

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
    order: OrderType
): GetOrderSuccessActionType => ({
    type: GET_ORDER_SUCCESS,
    name: order.name,
    numberOrder: order.order.number,
});
