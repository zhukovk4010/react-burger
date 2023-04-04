//Reducer выбранных ингредиентов, итоговой цены

//импорты
import { IngredientType } from "./../../types/types";
import { SelectedIngredientsTypes } from "./../actions/selectedIngredients";
import {
    ADD_INGREDIENT,
    ADD_BUN,
    UPDATE_SELECTED_INGREDIENTS,
    DELETE_SELECTED_INGREDIENT,
    DELETE_SELECTED_INGREDIENTS,
} from "../../utils/constants";

//Тип выбранного ингредиента
type SelectedIngredientType = {
    ingredient: IngredientType;
    dragId: string;
};

//Тип состояния
type InitialStateType = {
    selectedIngredientsData: Array<SelectedIngredientType>;
    selectedBun: IngredientType | null;
};

//Начальное состояние
const initialState: InitialStateType = {
    selectedIngredientsData: [],
    selectedBun: null,
};

const selectedIngredintsReducer = (
    state = initialState,
    action: SelectedIngredientsTypes
): InitialStateType => {
    switch (action.type) {
        //Добавляем ингредиент в конструктор
        //Обновляем цену
        case ADD_INGREDIENT:
            return {
                ...state,
                selectedIngredientsData: [
                    ...state.selectedIngredientsData,
                    action.ingredient,
                ],
            };
        //Добавляем булку
        case ADD_BUN:
            return {
                ...state,
                selectedBun: action.ingredient,
            };
        //Обновляем список ингредиентов при сортировке (Булки нет в списке)
        case UPDATE_SELECTED_INGREDIENTS:
            return {
                ...state,
                selectedIngredientsData: action.ingredients,
            };
        //Удаляем ингредиент
        case DELETE_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredientsData: action.ingredients,
            };
        //Удаляем все выбранные ингредиенты
        case DELETE_SELECTED_INGREDIENTS:
            return {
                ...state,
                selectedIngredientsData: [],
                selectedBun: null,
            };
        default:
            return state;
    }
};

export default selectedIngredintsReducer;
