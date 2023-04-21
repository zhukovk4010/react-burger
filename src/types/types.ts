import { Action, ActionCreator } from "redux";
import { IngredientsActionsTypes } from "../services/actions/ingredients";
import { ModalActionsTypes } from "../services/actions/modal";
import { OrderActionsTypes } from "../services/actions/order";
import { OrdersTypes } from "../services/actions/orders";
import { SelectedIngredientTypes } from "../services/actions/selectedIngredient";
import { SelectedIngredientsTypes } from "../services/actions/selectedIngredients";
import { UserActionsTypes } from "../services/actions/user";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppStateType } from "../services/store";
import { Dispatch } from "react";

//Тип ингредиента
export type IngredientType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

//Тип ингредиента в конструкторе
export type SelectedIngredientType = {
    ingredient: IngredientType;
    dragId: string;
};

//Тип данных, которые приходят после создания заказа
export type OrderType = {
    name: string;
    order: { number: number };
    success: boolean;
};

//Тип заказа, который приходит с сервера

export type WsOrderType = {
    _id?: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

//Типы всех экшенов приложения
type AppActionsTypes =
    | IngredientsActionsTypes
    | ModalActionsTypes
    | OrderActionsTypes
    | OrdersTypes
    | SelectedIngredientTypes
    | SelectedIngredientsTypes
    | UserActionsTypes;

//Типизация thunk
// export type AppThunk<ReturnType = void> = ActionCreator<
//     ThunkAction<ReturnType, Action, AppStateType, AppActionsTypes>
// >;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, AppStateType, AppActionsTypes>
>;
//Типизация dispatch
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsTypes>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatchThunk = Dispatch<AppActionsTypes>;
