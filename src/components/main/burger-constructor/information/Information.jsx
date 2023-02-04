//Компонент с информацией о итоговой цене и кнопке "Оформить заказ"

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Information.module.css';


const Information = () => {
    return (
        <section className={`mt-10 ml-4 mr-4 ${styles.information}`}>
            <div className={styles.totalPrice}>
                <p className='text text_type_main-medium'>610</p>
                <div className={styles.icon}>
                    <CurrencyIcon />
                </div>
            </div>
            <Button htmlType="button" type="primary" size="medium">
                Нажми на меня
            </Button>
        </section>
    );
}


export default Information;