//Функция запроса заказа

import { URL_ORDERS } from '../../utils/constants';
import { getOrderSuccessAC } from '../actions/orders/getOrderSuccess';
import { getOrderAC } from '../actions/orders/getOrder';
import { getOrderFailedAC } from '../actions/orders/getOrderFailed';
import { openOrderModalActionCreator } from '../actions/modal/openOrderModal';
import { deleteSelectedIngredients } from '../actions/selected-ingredients/deleteIngredients';


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
                dispatch(openOrderModalActionCreator());
                dispatch(deleteSelectedIngredients());
            } else {
                //Если данные неккоректны, тогда диспатчим ошибку и показываем в модальном окне сообщение об ошибке
                //Все ингредиенты из конструктора удаляются
                dispatch(getOrderFailedAC());
                dispatch(openOrderModalActionCreator());
            }
        } catch (error) {
            //Если ответ не получен, тогда диспатчим ошибку и показываем в модальном окне сообщение об ошибке
            //Все ингредиенты из конструктора удаляются
            dispatch(getOrderFailedAC());
            dispatch(openOrderModalActionCreator());
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

    // const getOrder = async () => {
    //     try {
    //         const res = await fetch('https://norma.nomoreparties.space/api/orders', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json;charset=utf-8'
    //             },
    //             body: JSON.stringify({'ingredients': idList}) 
    //         });
    //         if (res.ok) {
    //             let data = await res.json();
    //             dispatch(addOrder(data.order.number, data.name));
    //             dispatch(openOrderModalActionCreator())
    //         } else {
    //             return Promise.reject(`Ошибка ${res.status}`);
    //         }  
    //     } catch (error) {
    //         console.error('Ошибка:', error)
    //     }
    // }
    // getOrder()
