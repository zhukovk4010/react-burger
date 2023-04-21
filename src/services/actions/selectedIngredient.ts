//Создание экшенов, связанных с выбранным ингредиентом для просмотра в модальном окне

//Импорты
import { IngredientType } from "../../types/types";
import {
    ADD_SELECTED_INGREDIENT,
    DELETE_SELECTED_INGREDIENT_MODAL,
} from "./actionsTypes";

//Типы экшенов
type AddSelectedIngredientToModalType = {
    type: typeof ADD_SELECTED_INGREDIENT;
    selectedIngredient: IngredientType;
};

type DeleteSelectedIngredientToModalType = {
    type: typeof DELETE_SELECTED_INGREDIENT_MODAL;
};

export type SelectedIngredientTypes =
    | AddSelectedIngredientToModalType
    | DeleteSelectedIngredientToModalType;

//Экшены

//Экшен при выборе ингредиента
export const addSelectedIngredientToModal = (
    selectedIngredient: IngredientType
): AddSelectedIngredientToModalType => ({
    type: ADD_SELECTED_INGREDIENT,
    selectedIngredient: selectedIngredient,
});

//Экшен при удалении выбранного ингредиента
export const deleteSelectedIngredientToModal =
    (): DeleteSelectedIngredientToModalType => ({
        type: DELETE_SELECTED_INGREDIENT_MODAL,
    });
