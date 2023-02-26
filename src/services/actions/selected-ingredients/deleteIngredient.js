import { DELETE_SELECTED_INGREDIENT } from "../../../utils/constants";

export const deleteSelectedElement = (data, price) => {
    return {
        type: DELETE_SELECTED_INGREDIENT, 
        data: data,
        price: price  
    }
}