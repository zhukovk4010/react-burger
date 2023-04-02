//Функция запроса заказа

import { getOrderSuccessAction } from "../actions/order";
import { getOrderAction } from "../actions/order";
import { getOrderFailedAction } from "../actions/order";
import { deleteSelectedIngredientsAction } from "../actions/selectedIngredients";
import { openOrderModalAction } from "../actions/modal";
import { sendOrder } from "../../utils/burgerApi";

export const getOrder = (idList) => {
    return async (dispatch) => {
        dispatch(getOrderAction());

        try {
            const res = await sendOrder({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ ingredients: idList }),
            });
            dispatch(getOrderSuccessAction(res));
            dispatch(openOrderModalAction());
            dispatch(deleteSelectedIngredientsAction());
        } catch (e) {
            dispatch(getOrderFailedAction(e.name));
            dispatch(openOrderModalAction());
        }
    };
};
