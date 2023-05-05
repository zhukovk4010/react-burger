//Reducer выбранного ингредиента

//Импорты
import { SelectedIngredientTypes } from "./../actions/selectedIngredient";
import { IngredientType } from "./../../types/types";

import {
    DELETE_SELECTED_INGREDIENT_MODAL,
    ADD_SELECTED_INGREDIENT,
} from "../actions/actionsTypes";

//Тип состояния
type InitialStateType = {
    selectedIngredient: IngredientType | null;
};

//Начальное состояние
export const initialState: InitialStateType = {
    selectedIngredient: null,
};

const selectedIngredientReducer = (
    state = initialState,
    action: SelectedIngredientTypes
): InitialStateType => {
    switch (action.type) {
        case ADD_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredient: action.selectedIngredient,
            };
        case DELETE_SELECTED_INGREDIENT_MODAL:
            return {
                ...state,
                selectedIngredient: null,
            };
        default:
            return state;
    }
};

export default selectedIngredientReducer;
