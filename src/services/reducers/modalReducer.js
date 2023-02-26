//Reducer модального окна

import { OPEN_INGREDIENT_MODAL, CLOSE_MODAL, OPEN_ORDER_MODAL } from "../../utils/constants";

const initialState = {
    openIngredientsDetailsModal: false,
    openOrderModal: false,
}


const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        //Открытие модального окна для детального обзора ингредиента
        case OPEN_INGREDIENT_MODAL:
            return {
                ...state,
                openIngredientsDetailsModal: true,
            }
        //Открытие модального окна заказа
        case OPEN_ORDER_MODAL:
            return {
                ...state,
                openOrderModal: true,
            }
        //Закрытие модального окна  
        case CLOSE_MODAL: 
            return {
                ...state,
                openIngredientsDetailsModal: false,
                openOrderModal: false,
            }
        default:
            return state;
    }
}


export default modalReducer;