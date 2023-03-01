//Компонент с информацией о итоговой цене и кнопке "Оформить заказ"
//При клике вызывается модальное окно с информацией о заказе

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { getOrder } from '../../../../services/thunk/getOrderThunk';

import { closeOrderModalAC } from '../../../../services/actions/modal';

import Modal from '../../../modals/Modal';
import OrderDetails from './order-details/OrderDetails';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TEXT_MEDIUM } from '../../../../utils/constants';
import styles from './Information.module.css';


const Information = props => {

    //Вытаскиваем нужные
    const { selectedIngredients, modal, order } = useSelector(store => ({
        selectedIngredients: store.selectedIngredients,
        modal: store.modal,
        order: store.order
    }))

    const dispatch = useDispatch()


    //Создание запроса
    //В нем созадется список id ингредиентов 
    //Затем диспачим функции getOrder, которая изменяется состояние секции заказов
    //Если запрос успешный, тогда отркывается модальное окно и в нем показывается номер заказа из API
    //Если запрос неуспешный, тогда в модальном окне появляется сообщение, что произошла ошибка
    const createOrder = () => {
        const idList = [];
        idList.push(selectedIngredients.selectedBun._id)
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
                <Modal onClose={() => dispatch(closeOrderModalAC())}>
                    {order.hasError ? (<div>Произошла ошибка, при обработке заказа</div>) : (<OrderDetails orderNumber={order.orderData.numberOrder} />)}
                    
                </Modal>
            )}
        </>
    )

    return (
        <section className={`mt-10 ml-4 mr-4 ${styles.information}`}>
            <div className={styles.totalPrice}>
                <p className={TEXT_MEDIUM}>{props.totalPrice}</p>
                <div className={styles.icon}>
                    <CurrencyIcon />
                </div>
            </div>
            {selectedIngredients.selectedBun ? (
                <Button onClick={createOrder} htmlType='button' type="primary" size="medium">
                Сделать заказ
            </Button>
            ) : ''}
            
            {modalContainer}
        </section>
    );
}

Information.propTypes = {
    totalPrice: PropTypes.number.isRequired
}


export default Information;