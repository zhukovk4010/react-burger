//Функция запроса ингредиентов

import { URL_INGREDIENTS } from '../../utils/constants';
import { getIngredientsAC } from '../actions/ingredients/getIngredients';
import { getIngredientsFailedAC } from '../actions/ingredients/getIngredientsFailed';
import { getIngredientsSuccessAC } from '../actions/ingredients/getIngredientsSuccess';


export const getIngredients = () => {
    return (async (dispatch) => {
        //Вызываем первый диспатч, изменяем состояние загрузки
        dispatch(getIngredientsAC());

        try {
            const res = await fetch(URL_INGREDIENTS);
            if (res.ok) {
                const data = await res.json();
                //Если все хорошо, диспатчим данные из API
                dispatch(getIngredientsSuccessAC(data.data));
            } else {
                //Пришли некорекные данные, диспатчим ошибку
                dispatch(getIngredientsFailedAC());
            }
        } catch (error) {
            //Ответ не пришел, диспатчим ошибку
            dispatch(getIngredientsFailedAC());
        }
    })
}
    // getIngredientsData = async () => {
    //     try {
    //         const res = await fetch(URL);
    //         if (res.ok) {
    //             const data = await res.json();
    //             dispatch({ type: 'addIngredients', data: data.data })
    //         } else {
    //             return Promise.reject(`Ошибка ${res.status}`);
    //         }
    //     } catch (error) {
    //         dispatch({ type: 'addError' })
    //         console.error('Ошибка:', error)
    //     }
    // }
