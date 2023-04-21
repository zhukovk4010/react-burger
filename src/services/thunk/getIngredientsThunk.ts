//Функция запроса ингредиентов

//Импорты
import { getIngredientsData } from "../../utils/burgerApi";
import { getIngredientsAction } from "../actions/ingredients";
import { getIngredientsFailedAction } from "../actions/ingredients";
import { getIngredientsSuccessAction } from "../actions/ingredients";
import { AppThunk } from "../../types/types";

export const getIngredients: AppThunk = () => {
    return async (dispatch) => {
        //Вызываем первый диспатч, изменяем состояние загрузки
        dispatch(getIngredientsAction());

        try {
            const res = await getIngredientsData();
            dispatch(getIngredientsSuccessAction(res.data));
        } catch (e) {
            dispatch(getIngredientsFailedAction());
        }
    };
};
