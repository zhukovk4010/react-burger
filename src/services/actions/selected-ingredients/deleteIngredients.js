import { DELETE_SELECTED_INGREDIENTS } from "../../../utils/constants";

export const deleteSelectedIngredients = () => {
    return {
        type: DELETE_SELECTED_INGREDIENTS,  
    }
}