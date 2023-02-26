import { ADD_INGREDIENT } from "../../../utils/constants";


export const addSelectedIngredient = (ingredientData, dragId) => {
    return ({
        type: ADD_INGREDIENT,
        ingredient: {ingredientData,
        dragId: dragId
        }
    })
}