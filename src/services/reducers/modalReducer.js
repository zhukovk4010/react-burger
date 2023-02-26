//Reducer модального окна

import { OPEN_INGREDIENT_MODAL, CLOSE_ORDER_MODAL, OPEN_ORDER_MODAL, CLOSE_INGREDIENT_MODAL,  } from "../../utils/constants";

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
        //Закрытие модального окна заказа  
        case CLOSE_ORDER_MODAL: 
            return {
                ...state,
                openOrderModal: false,
            }
        //Закрытие модального окна детального описания ингредиента
        case CLOSE_INGREDIENT_MODAL:
            return {
                ...state,
                openIngredientsDetailsModal: false
            }
        default:
            return state;
    }
}


export default modalReducer;