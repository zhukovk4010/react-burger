//Reducer списка ингредиетов

// импорты
import { IngredientType } from "../../types/types";
import { IngredientsActionsTypes } from "./../actions/ingredients";
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from "../actions/actionsTypes";

//Тип initialState
export type InitialStateType = {
    ingredientsData: Array<IngredientType>;
    isLoading: boolean;
    hasError: boolean;
};

//Начальное состояние (список ингредиентов, состояние загрузки и наличие ошибки)
const initialState: InitialStateType = {
    ingredientsData: [],
    isLoading: false,
    hasError: false,
};

const ingredientsReducer = (
    state = initialState,
    action: IngredientsActionsTypes
): InitialStateType => {
    switch (action.type) {
        //При обращению к API
        case GET_INGREDIENTS:
            return { ...state, isLoading: true, hasError: false };
        //При успешном получение данных из API
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsData: action.ingredients,
                isLoading: false,
                hasError: false,
            };
        //При возникновении ошибки
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            };
        default:
            return state;
    }
};

export default ingredientsReducer;
