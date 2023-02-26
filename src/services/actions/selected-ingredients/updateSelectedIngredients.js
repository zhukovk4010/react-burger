import { UPDATE_SELECTED_INGREDIENTS } from "../../../utils/constants";

export const updateSelectedIngredients = (ingredients) => {
    return ({
        type: UPDATE_SELECTED_INGREDIENTS,
        ingredients: ingredients
    })
}