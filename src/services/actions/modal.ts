//Создание экшенов, связанных с модальным окном

//Импорты
import {
    OPEN_ORDER_MODAL,
    OPEN_INGREDIENT_MODAL,
    CLOSE_ORDER_MODAL,
    CLOSE_INGREDIENT_MODAL,
} from "../../utils/constants";

//Типы экшенов
type OpenOrderModalActionType = {
    type: typeof OPEN_ORDER_MODAL;
};

type OpenIngredientModalActionType = {
    type: typeof OPEN_INGREDIENT_MODAL;
};

type CloseOrderModalActionType = {
    type: typeof CLOSE_ORDER_MODAL;
};

type CloseIngredientModalActionType = {
    type: typeof CLOSE_INGREDIENT_MODAL;
};

export type ModalActionsTypes =
    | OpenOrderModalActionType
    | OpenIngredientModalActionType
    | CloseOrderModalActionType
    | CloseIngredientModalActionType;

//Экшены

//Экшен открытия модального окна заказа
export const openOrderModalAction = (): OpenOrderModalActionType => ({
    type: OPEN_ORDER_MODAL,
});

//Экшен открытия модального окна ингредиента
export const openIngredientModalAction = (): OpenIngredientModalActionType => ({
    type: OPEN_INGREDIENT_MODAL,
});

//Экшен закрытия модального окна заказа
export const closeOrderModalAction = (): CloseOrderModalActionType => ({
    type: CLOSE_ORDER_MODAL,
});

//Экшен закрытия модального окна ингредиента
export const closeIngredientModalAction =
    (): CloseIngredientModalActionType => ({ type: CLOSE_INGREDIENT_MODAL });
