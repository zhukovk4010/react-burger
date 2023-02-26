//Функция запроса заказа

import { URL_ORDERS } from '../../utils/constants';
import { getOrderSuccessAC } from '../actions/order';
import { getOrderAC } from '../actions/order';
import { getOrderFailedAC } from '../actions/order';
import { deleteSelectedIngredients } from '../actions/selectedIngredients';
import { openOrderModalAC } from '../actions/modal';


export const getOrder = (idList) => {
    return (async (dispatch) => {
        //Включаем загрузку
        dispatch(getOrderAC());

        try {
            const res = await fetch(URL_ORDERS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({'ingredients': idList})   
            });
            if (res.ok) {
                const data = await res.json();
                //Если все правильно, диспатчим данные в хранилище и вызываем модальное окно заказа
                //Все ингредиенты из конструктора удаляются
                dispatch(getOrderSuccessAC(data));
                dispatch(openOrderModalAC());
                dispatch(deleteSelectedIngredients());
            } else {
                //Если данные неккоректны, тогда диспатчим ошибку и показываем в модальном окне сообщение об ошибке
                //Все ингредиенты из конструктора удаляются
                dispatch(getOrderFailedAC());
                dispatch(openOrderModalAC());
            }
        } catch (error) {
            //Если ответ не получен, тогда диспатчим ошибку и показываем в модальном окне сообщение об ошибке
            //Все ингредиенты из конструктора удаляются
            dispatch(getOrderFailedAC());
            dispatch(openOrderModalAC());
        }
    })
}