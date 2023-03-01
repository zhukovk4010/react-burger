//Корневой reducer

import { combineReducers } from 'redux';

import ingredientsReducer from './ingredientsReducer';
import selectedIngredientsReducer from './selectedIngredientsReducer';
import orderRedicer from './orderReducer';
import selectedIngredientReducer from './selectedIngredientReducer';
import modalReducer from './modalReducer';


const rootReducer = combineReducers({
    //Ингредиенты из API
    ingredients: ingredientsReducer,
    //Выбранные ингредиенты в конструкторе
    selectedIngredients: selectedIngredientsReducer,
    //Выбранный ингредиент, для просмотра в модальном окне
    selectedIngredient: selectedIngredientReducer,
    //Список заказов
    order: orderRedicer,
    //Состояние модальных окон
    modal: modalReducer,
});


export default rootReducer;