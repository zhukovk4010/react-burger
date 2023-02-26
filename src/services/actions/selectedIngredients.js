import { 
    ADD_BUN, 
    ADD_INGREDIENT, 
    DELETE_SELECTED_INGREDIENT, 
    DELETE_SELECTED_INGREDIENTS, 
    UPDATE_SELECTED_INGREDIENTS 
} from "../../utils/constants";

export const addBun = (ingredient) => {
    return ({
        type: ADD_BUN,
        ingredient: ingredient
    })
}

export const addSelectedIngredient = (ingredientData, dragId) => {
    return ({
        type: ADD_INGREDIENT,
        ingredient: {ingredientData,
        dragId: dragId
        }
    })
}

export const deleteSelectedElement = (data, price) => {
    return {
        type: DELETE_SELECTED_INGREDIENT, 
        data: data,
        price: price  
    }
}

export const deleteSelectedIngredients = () => {
    return {
        type: DELETE_SELECTED_INGREDIENTS,  
    }
}

export const updateSelectedIngredients = (ingredients) => {
    return ({
        type: UPDATE_SELECTED_INGREDIENTS,
        ingredients: ingredients
    })
}