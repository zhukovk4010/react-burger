//Функция запроса ингредиентов

//Импорты
import { getIngredientsData } from "../../utils/burgerApi";
import { getIngredientsAction } from "../actions/ingredients";
import { getIngredientsFailedAction } from "../actions/ingredients";
import { getIngredientsSuccessAction } from "../actions/ingredients";

export const getIngredients = () => {
    return async (dispatch) => {
        //Вызываем первый диспатч, изменяем состояние загрузки
        dispatch(getIngredientsAction());

        try {
            const res = await getIngredientsData();
            dispatch(getIngredientsSuccessAction(res.data));
        } catch (err) {
            dispatch(getIngredientsFailedAction());
        }
    };
};
