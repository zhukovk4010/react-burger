//Компонент с информацией о итоговой цене и кнопке "Оформить заказ"
//При клике вызывается модальное окно с информацией о заказе

import { useState } from 'react';

import Modal from '../../../modals/Modal';
import OrderDetails from './order-details/OrderDetails';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TEXT_MEDIUM } from '../../../../utils/fontsStyles';
import styles from './Information.module.css';


const Information = () => {

    const [openModal, setOpenModal] = useState(false);

    //При openModal == true, отрисовывается содержимое переменной
    //Передаем в модальное окно функцию onClose, которая будет закрывать модальное окно
    let modal = (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <OrderDetails />
        </Modal>
    )

    return (
        <section className={`mt-10 ml-4 mr-4 ${styles.information}`}>
            <div className={styles.totalPrice}>
                <p className={TEXT_MEDIUM}>610</p>
                <div className={styles.icon}>
                    <CurrencyIcon />
                </div>
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={() => setOpenModal(true)}>
                Нажми на меня
            </Button>
            {modal}         
        </section>
    );
}


export default Information;