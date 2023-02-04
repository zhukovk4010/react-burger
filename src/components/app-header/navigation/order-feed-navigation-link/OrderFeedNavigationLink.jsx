//Компонент кнопки переключения на ленту заказов

import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './OrderFeedNavigationLink.module.css';


const OrderFeedNavigationLink = () => {
    return (
        <a className={`pl-5 pr-5 pb-4 pt-4 ${styles.button}`}>
            <ListIcon type='secondary' />
            <h3 className='text text_type_main-default colorInActive'>Лента заказов</h3>
        </a>
    );
}


export default OrderFeedNavigationLink;