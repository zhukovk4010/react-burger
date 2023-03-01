//Reducer выбранного ингредиента

import { DELETE_SELECTED_INGREDIENT_MODAL, ADD_SELECTED_INGREDIENT } from "../../utils/constants";

const initialState = null;


const selectedIngredintReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SELECTED_INGREDIENT:
            return action.selectedIngredient
        case DELETE_SELECTED_INGREDIENT_MODAL:
            return {
                state: null
            }
        default:
            return state;
    }
}


export default selectedIngredintReducer;