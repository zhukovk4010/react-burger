import { ADD_BUN } from "../../../utils/constants";

export const addBun = (ingredient) => {
    return ({
        type: ADD_BUN,
        ingredient: ingredient
    })
}