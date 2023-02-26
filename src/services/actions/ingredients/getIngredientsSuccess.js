import { GET_INGREDIENTS_SUCCESS } from "../../../utils/constants";

export const getIngredientsSuccessAC = (data) => {
    return (
        {
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data
        }
    )
}