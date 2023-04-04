//Корневой reducer

import { AnyAction, combineReducers } from "redux";

import ingredientsReducer from "./ingredientsReducer";
import selectedIngredientsReducer from "./selectedIngredientsReducer";
import orderRedicer from "./orderReducer";
import selectedIngredientReducer from "./selectedIngredientReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userReducer";
import { ThunkDispatch } from "redux-thunk";

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
    //Пользователь
    user: userReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;
export type DispatchType = ThunkDispatch<AppStateType, void, AnyAction>;

export default rootReducer;
