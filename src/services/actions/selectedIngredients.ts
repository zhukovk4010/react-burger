//Создание экшенов, связанных с добавлением и удалением ингредиентов

//Импорты
import uuid from "react-uuid";

import { IngredientType } from "../../types/types";

import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_SELECTED_INGREDIENT,
    DELETE_SELECTED_INGREDIENTS,
    UPDATE_SELECTED_INGREDIENTS,
} from "../../utils/constants";

//Типы экшенов
type SelectedIngredientType = {
    ingredient: IngredientType;
    dragId: string;
};

type AddBunActionType = {
    type: typeof ADD_BUN;
    ingredient: IngredientType;
};

type AddSelectedIngredientActionType = {
    type: typeof ADD_INGREDIENT;
    ingredient: { ingredient: IngredientType; dragId: string };
};

type DeleteSelectedIngredientActionType = {
    type: typeof DELETE_SELECTED_INGREDIENT;
    ingredients: Array<SelectedIngredientType>;
};

type DeleteSelectedIngredientsActionType = {
    type: typeof DELETE_SELECTED_INGREDIENTS;
};

type UpdateSelectedIngredientsType = {
    type: typeof UPDATE_SELECTED_INGREDIENTS;
    ingredients: Array<SelectedIngredientType>;
};

export type SelectedIngredientsTypes =
    | AddBunActionType
    | AddSelectedIngredientActionType
    | DeleteSelectedIngredientActionType
    | DeleteSelectedIngredientsActionType
    | UpdateSelectedIngredientsType;

//Экшены

//Экшен добавления булки в конструктор
export const addBunAction = (ingredient: IngredientType): AddBunActionType => ({
    type: ADD_BUN,
    ingredient: ingredient,
});

//Экшен добавления главного ингредиента в конструктор
export const addSelectedIngredientAction = (
    ingredient: IngredientType
): AddSelectedIngredientActionType => ({
    type: ADD_INGREDIENT,
    ingredient: { ingredient, dragId: uuid() },
});

//Экшен удаления ингредиента из конструктора
export const deleteSelectedIngredientAction = (
    ingredients: Array<SelectedIngredientType>
): DeleteSelectedIngredientActionType => ({
    type: DELETE_SELECTED_INGREDIENT,
    ingredients: ingredients,
});

//Экшен удаления всех ингредиентов из конструктора
export const deleteSelectedIngredientsAction =
    (): DeleteSelectedIngredientsActionType => ({
        type: DELETE_SELECTED_INGREDIENTS,
    });

//Экшен изменения списка добавленных ингредиентов в конструктор
export const updateSelectedIngredients = (
    ingredients: Array<SelectedIngredientType>
): UpdateSelectedIngredientsType => ({
    type: UPDATE_SELECTED_INGREDIENTS,
    ingredients: ingredients,
});
