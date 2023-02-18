//Компонент с информацией о итоговой цене и кнопке "Оформить заказ"
//При клике вызывается модальное окно с информацией о заказе

import { useContext, useState } from 'react';

import { IngredientsContext } from '../../../../utils/context';

import Modal from '../../../modals/Modal';
import OrderDetails from './order-details/OrderDetails';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TEXT_MEDIUM } from '../../../../utils/fontsStyles';
import styles from './Information.module.css';



const Information = () => {

    const { state, dispatch } = useContext(IngredientsContext);

    //Состояние модального окна
    const [openModal, setOpenModal] = useState(false);

    //Создание запроса
    //В нем созадется список id ингредиентов и отправляется запрос к API
    //Если запрос успешный, тогда отркывается модальное окно и в нем показывается номер заказа из API
    //Если запрос неуспешный или данные которые из него пришли, тогда в консоле появляется ошибка, 
    //а модальное окно не открывается
    const createOrder = () => {
        const idList = [];
        for (let i = 0; i < state.selectedIngredients.otherIngredients.length; i++) {
            idList.push(state.selectedIngredients.otherIngredients[i]._id)
        }
        idList.push(state.selectedIngredients.bun._id)
        const getOrder = async () => {
            try {
                const res = await fetch('https://norma.nomoreparties.space/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({'ingredients': idList}) 
                });
                if (res.ok) {
                    let data = await res.json();
                    dispatch({type: 'addOrder', name: data.name, orderNumber: data.order.number});
                    setOpenModal(true)
                } else {
                    return Promise.reject(`Ошибка ${res.status}`);
                }  
            } catch (error) {
                console.error('Ошибка:', error)
            }
        }
        getOrder()
        
    }

    
    //При openModal == true, отрисовывается содержимое переменной
    //Передаем в модальное окно функцию onClose, которая будет закрывать модальное окно
    const modal = (
        <>
            {openModal && (
                <Modal onClose={() => setOpenModal(false)}>
                    <OrderDetails orderNumber={state.orders[state.orders.length - 1].orderNumber}  />
                </Modal>
            )}
        </>
    )

    return (
        <section className={`mt-10 ml-4 mr-4 ${styles.information}`}>
            <div className={styles.totalPrice}>
                <p className={TEXT_MEDIUM}>{state.selectedIngredients.totalPrice}</p>
                <div className={styles.icon}>
                    <CurrencyIcon />
                </div>
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={createOrder}>
                Нажми на меня
            </Button>
            {modal}
        </section>
    );
}


export default Information;