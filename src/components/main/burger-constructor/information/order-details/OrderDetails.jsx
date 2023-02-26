import PropTypes from 'prop-types';

import styles from './OrderDetails.module.css';
import { DIGITS_LARGE, TEXT_DEFAULT, TEXT_MEDIUM, TEXT_INACTIVE_COLOR } from "../../../../../utils/constants";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const OrderDetails = props => {
    return (
        <div className={styles.orderDetails}>
            <p className={`${DIGITS_LARGE} ${styles.numberOrder}`}>{props.orderNumber}</p>
            <p className={`${TEXT_MEDIUM} ${styles.orderText}`}>Идентификатор заказа</p>
            <div className={styles.iconContainer}><CheckMarkIcon type="primary" /></div>
            <p className={`${TEXT_DEFAULT} ${styles.textMakeOrder}`}>Ваш заказ начали готовить</p>
            <p className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR} ${styles.textWaiting}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
}


export default OrderDetails;