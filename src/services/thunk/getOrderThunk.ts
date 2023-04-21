//Функция запроса заказа

//Импорты
import { getOrderFromApiAction, getOrderSuccessAction } from "../actions/order";
import { getOrderAction } from "../actions/order";
import { getOrderFailedAction } from "../actions/order";
import { deleteSelectedIngredientsAction } from "../actions/selectedIngredients";
import { openOrderModalAction } from "../actions/modal";
import { getOrderApi, sendOrder } from "../../utils/burgerApi";
import { AppDispatchThunk, AppThunk } from "../../types/types";
import { getCookie } from "../../utils/cookie";

export const getOrder: AppThunk = (idList: Array<string>) => {
    return async (dispatch: AppDispatchThunk) => {
        dispatch(getOrderAction());

        try {
            const res = await sendOrder({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    authorization: "Bearer " + getCookie("accessToken"),
                },
                body: JSON.stringify({ ingredients: idList }),
            });
            dispatch(getOrderSuccessAction(res.order.number));
            dispatch(openOrderModalAction());
            dispatch(deleteSelectedIngredientsAction());
        } catch (e: unknown) {
            if (e instanceof Error) {
                dispatch(getOrderFailedAction(e.name));
                dispatch(openOrderModalAction());
            }
        }
    };
};

export const getOrderFromApi: AppThunk = (number: string) => {
    return async (dispatch: AppDispatchThunk) => {
        try {
            const res = await getOrderApi(number, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });
            dispatch(getOrderFromApiAction(res.orders[0]));
        } catch (e) {}
    };
};
