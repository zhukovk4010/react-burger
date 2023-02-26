//Создание экшенов, связанных с созданием заказа

import { GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../../utils/constants";

export const getOrderAC = () => {return {type: GET_ORDER}}

export const getOrderFailedAC = () => {return {type: GET_ORDER_FAILED}}

export const getOrderSuccessAC = (data) => {
    return (
        {
            type: GET_ORDER_SUCCESS,
            name: data.name,
            numberOrder: data.order.number
        }
    )
}