//Корневой reducer

import { combineReducers } from "redux";

import ingredientsReducer from "./ingredientsReducer";
import selectedIngredientsReducer from "./selectedIngredientsReducer";
import orderRedicer from "./orderReducer";
import selectedIngredientReducer from "./selectedIngredientReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";
import wsOrdersReducer from "./ordersReducer";

const rootReducer = combineReducers({
    //Ингредиенты из API
    ingredients: ingredientsReducer,
    //Выбранные ингредиенты в конструкторе
    selectedIngredients: selectedIngredientsReducer,
    //Выбранный ингредиент, для просмотра в модальном окне
    selectedIngredient: selectedIngredientReducer,
    //Заказ
    order: orderRedicer,
    //Состояние модальных окон
    modal: modalReducer,
    //Пользователь
    user: userReducer,
    //Список заказов
    orders: wsOrdersReducer,
});

export default rootReducer;
