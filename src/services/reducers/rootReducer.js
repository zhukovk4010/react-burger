//Корневой reducer

import { combineReducers } from 'redux';

import ingredientsReducer from './ingredientsReducer';
import selectedIngredientsReducer from './selectedIngredientsReducer';
import ordersRedicer from './ordersReducer';
import selectedIngredientReducer from './selectedIngredientReducer';
import modalReducer from './modalReducer';
import activeTabReducer from './activeTabReducer';


const rootReducer = combineReducers({
    //Ингредиенты из API
    ingredients: ingredientsReducer,
    //Выбранные ингредиенты в конструкторе
    selectedIngredients: selectedIngredientsReducer,
    //Выбранный ингредиент, для просмотра в модальном окне
    selectedIngredient: selectedIngredientReducer,
    //Список заказов
    orders: ordersRedicer,
    //Состояние модальных окон
    modal: modalReducer,
    //Переключатели
    tabs: activeTabReducer,
});


export default rootReducer;