//Создание экшенов, связанных с выбранным ингредиентом для просмотра в модальном окне

import { ADD_SELECTED_INGREDIENT, DELETE_SELECTED_INGREDIENT_MODAL } from "../../utils/constants";

export const addSelectedIngredientModal = (selectedIngredient) => {
    return ({
        type: ADD_SELECTED_INGREDIENT,
        selectedIngredient: selectedIngredient
    })
}

export const deleteSelectedIngredient = () => {
    return {
        type: DELETE_SELECTED_INGREDIENT_MODAL, 
    }
}