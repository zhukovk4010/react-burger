//ActionCreator добавления просматриваемого ингредиента в модальном окне

import { ADD_SELECTED_INGREDIENT } from "../../../utils/constants";

export const addSelectedIngredientModal = (selectedIngredient) => {
    return ({
        type: ADD_SELECTED_INGREDIENT,
        selectedIngredient: selectedIngredient
    })
}