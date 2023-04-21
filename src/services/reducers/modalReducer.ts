//Reducer модального окна

//Импорты
import { ModalActionsTypes } from "../actions/modal";
import {
    OPEN_INGREDIENT_MODAL,
    CLOSE_ORDER_MODAL,
    OPEN_ORDER_MODAL,
    CLOSE_INGREDIENT_MODAL,
    OPEN_ORDER_DETAILS_MODAL,
    CLOSE_ORDER_DETAILS_MODAL,
} from "../actions/actionsTypes";

//Тип начального состояния
type InitialStateType = {
    openIngredientDetailsModal: boolean;
    openOrderModal: boolean;
    openOrderDetailsModal: boolean;
};

//Начальное состояние
const initialState: InitialStateType = {
    openIngredientDetailsModal: false,
    openOrderModal: false,
    openOrderDetailsModal: false,
};

const modalReducer = (
    state = initialState,
    action: ModalActionsTypes
): InitialStateType => {
    switch (action.type) {
        //Открытие модального окна для детального обзора ингредиента
        case OPEN_INGREDIENT_MODAL:
            return {
                ...state,
                openIngredientDetailsModal: true,
            };
        //Открытие модального окна заказа
        case OPEN_ORDER_MODAL:
            return {
                ...state,
                openOrderModal: true,
            };
        //Закрытие модального окна заказа
        case CLOSE_ORDER_MODAL:
            return {
                ...state,
                openOrderModal: false,
            };
        //Закрытие модального окна детального описания ингредиента
        case CLOSE_INGREDIENT_MODAL:
            return {
                ...state,
                openIngredientDetailsModal: false,
            };
        //Открытие модального окна детального описания заказа из ленты
        case OPEN_ORDER_DETAILS_MODAL:
            return {
                ...state,
                openOrderDetailsModal: true,
            };
        //Закрытие модального окна детального описания заказа из ленты
        case CLOSE_ORDER_DETAILS_MODAL:
            return {
                ...state,
                openOrderDetailsModal: false,
            };
        default:
            return state;
    }
};

export default modalReducer;
