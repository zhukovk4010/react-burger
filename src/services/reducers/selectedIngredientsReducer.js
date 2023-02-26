//Reducer выбранных ингредиентов, итоговой цены

import { ADD_INGREDIENT, ADD_BUN, UPDATE_SELECTED_INGREDIENTS, DELETE_SELECTED_INGREDIENT, DELETE_SELECTED_INGREDIENTS } from "../../utils/constants";

const initialState = {
    selectedIngredientsData: [],
    selectedBun: null,
}


const selectedIngredintsReducer = (state = initialState, action) => {
    switch (action.type) {
        //Добавляем ингредиент в конструктор
        //Обновляем цену
        case ADD_INGREDIENT:
            return {
                ...state,
                selectedIngredientsData: [...state.selectedIngredientsData,
                action.ingredient]
            }
        //Добавляем булку
        case ADD_BUN:
            return {
                ...state,
                selectedBun: action.ingredient,
            }
        //Обновляем список ингредиентов при сортировке (Булки нет в списке)
        case UPDATE_SELECTED_INGREDIENTS:
            return {
                ...state,
                selectedIngredientsData: action.ingredients
            }
        //Удаляем ингредиент
        case DELETE_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngredientsData: action.data,
                totalPrice: state.totalPrice - action.price
            }
        //Удаляем все выбранные ингредиенты
        case DELETE_SELECTED_INGREDIENTS:
            return {
                ...state,
                selectedIngredientsData: [],
                selectedBun: null,
                totalPrice: 0,
            }
        default:
            return state;
    }
}


export default selectedIngredintsReducer;