//Функция запроса заказа

import { getOrderSuccessAC } from "../actions/order";
import { getOrderAC } from "../actions/order";
import { getOrderFailedAC } from "../actions/order";
import { deleteSelectedIngredients } from "../actions/selectedIngredients";
import { openOrderModalAC } from "../actions/modal";
import { sendOrder } from "../../utils/burger-api";

export const getOrder = (idList) => {
    return async (dispatch) => {
        dispatch(getOrderAC());

        try {
            const res = await sendOrder({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ ingredients: idList }),
            });
            dispatch(getOrderSuccessAC(res));
            dispatch(openOrderModalAC());
            dispatch(deleteSelectedIngredients());
        } catch (e) {
            dispatch(getOrderFailedAC(e.name));
            dispatch(openOrderModalAC());
        }
    };
};
