//Функция запроса ингредиентов

import { getIngredientsData } from "../../utils/burger-api";
import { getIngredientsAC } from "../actions/ingredients";
import { getIngredientsFailedAC } from "../actions/ingredients";
import { getIngredientsSuccessAC } from "../actions/ingredients";

export const getIngredients = () => {
    return async (dispatch) => {
        //Вызываем первый диспатч, изменяем состояние загрузки
        dispatch(getIngredientsAC());

        try {
            const res = await getIngredientsData();
            dispatch(getIngredientsSuccessAC(res.data));
        } catch (err) {
            dispatch(getIngredientsFailedAC());
        }
    };
};
