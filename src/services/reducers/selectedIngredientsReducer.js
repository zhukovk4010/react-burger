//Reducer выбранных ингредиентов, итоговой цены

import { ADD_INGREDIENT, ADD_BUN, UPDATE_SELECTED_INGREDIENTS, DELETE_SELECTED_INGREDIENT, DELETE_SELECTED_INGREDIENTS } from "../../utils/constants";

const initialState = {
    selectedIngredientsData: [],
    selectedBun: null,
    totalPrice: 0,
}


const selectedIngredintsReducer = (state = initialState, action) => {
    switch (action.type) {
        //Добавляем ингредиент в конструктор
        //Обновляем цену
        case ADD_INGREDIENT:
            return {
                ...state,
                selectedIngredientsData: [...state.selectedIngredientsData,
                action.ingredient],
                totalPrice: state.totalPrice + action.ingredient.ingredientData.price
            }
        //Добавляем булку
        case ADD_BUN:
            //Условия, если в конструкторе уже добавлена булка или нет
            //Чтобы правильно рассчитать итоговую стоимость
            if (state.selectedBun === null) {
                return {
                    ...state,
                    selectedBun: action.ingredient,
                    totalPrice: state.totalPrice + action.ingredient.price * 2
                }
            } else {
                return {
                    ...state,
                    selectedBun: action.ingredient,
                    totalPrice: state.totalPrice - state.selectedBun.price * 2 + action.ingredient.price * 2
                }
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