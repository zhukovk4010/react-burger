//Создание экшенов, связанных с созданием заказа

import {
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from "../../utils/constants";

export const getOrderAC = () => {
    return { type: GET_ORDER };
};

export const getOrderFailedAC = (errorName) => {
    return { type: GET_ORDER_FAILED, errorName: errorName };
};

export const getOrderSuccessAC = (data) => {
    return {
        type: GET_ORDER_SUCCESS,
        name: data.name,
        numberOrder: data.order.number,
    };
};
