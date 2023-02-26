//Компонент с информацией о итоговой цене и кнопке "Оформить заказ"
//При клике вызывается модальное окно с информацией о заказе

import { useDispatch, useSelector } from 'react-redux';

import { getOrder } from '../../../../services/thunk/getOrderThunk';

import { closeModalActionCreator } from '../../../../services/actions/modal/closeIngredientModal';

import Modal from '../../../modals/Modal';
import OrderDetails from './order-details/OrderDetails';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TEXT_MEDIUM } from '../../../../utils/constants';
import styles from './Information.module.css';


const Information = () => {

    //Вытаскиваем нужные
    const { selectedIngredients, totalPrice, modal, orders } = useSelector(store => ({
        selectedIngredients: store.selectedIngredients,
        totalPrice: store.selectedIngredients.totalPrice,
        modal: store.modal,
        orders: store.orders
    }))

    const dispatch = useDispatch()


    //Создание запроса
    //В нем созадется список id ингредиентов 
    //Затем диспачим функции getOrder, которая изменяется состояние секции заказов
    //Если запрос успешный, тогда отркывается модальное окно и в нем показывается номер заказа из API
    //Если запрос неуспешный, тогда в модальном окне появляется сообщение, что произошла ошибка
    const createOrder = () => {
        const idList = [];
        for (let i = 0; i < selectedIngredients.selectedIngredientsData.length; i++) {
            idList.push(selectedIngredients.selectedIngredientsData[i].ingredientData._id)
        }
        idList.push(selectedIngredients.selectedBun._id)
        dispatch(getOrder(idList));
    }

    
    //Если состояние модального окна заказа изменяется на true, отрисовывается модалка
    const modalContainer = (
        <>
            {modal.openOrderModal && (
                <Modal onClose={() => dispatch(closeModalActionCreator())}>
                    {orders.hasError ? (<div>Произошла ошибка, при обработке заказа</div>) : (<OrderDetails orderNumber={orders.ordersData[orders.ordersData.length - 1].numberOrder} />)}
                    
                </Modal>
            )}
        </>
    )

    return (
        <section className={`mt-10 ml-4 mr-4 ${styles.information}`}>
            <div className={styles.totalPrice}>
                <p className={TEXT_MEDIUM}>{totalPrice}</p>
                <div className={styles.icon}>
                    <CurrencyIcon />
                </div>
            </div>
            <Button onClick={createOrder} htmlType="button" type="primary" size="medium">
                Нажми на меня
            </Button>
            {modalContainer}
        </section>
    );
}


export default Information;