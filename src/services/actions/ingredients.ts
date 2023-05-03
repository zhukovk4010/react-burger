//Создание экшенов, связанных со списком ингредиентов

// импорты
import { IngredientType } from "../../types/types";
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
} from "./actionsTypes";

//Типы экшенов
type GetIngredientsActionType = {
    type: typeof GET_INGREDIENTS;
};

type GetIngredientsFailedActionType = {
    type: typeof GET_INGREDIENTS_FAILED;
};

type GetIngredientsSuccessActionType = {
    type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: Array<IngredientType>;
};

export type IngredientsActionsTypes =
    | GetIngredientsActionType
    | GetIngredientsFailedActionType
    | GetIngredientsSuccessActionType;

//Экшены

//Экшен запроса ингредиентов из API
export const getIngredientsAction = (): GetIngredientsActionType => ({
    type: GET_INGREDIENTS,
});

//Экшен неудачной попытки запроса к API
export const getIngredientsFailedAction =
    (): GetIngredientsFailedActionType => ({
        type: GET_INGREDIENTS_FAILED,
    });

//Экшен удачной попытки запроса к серверу
export const getIngredientsSuccessAction = (
    ingredients: Array<IngredientType>
): GetIngredientsSuccessActionType => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: ingredients,
});
