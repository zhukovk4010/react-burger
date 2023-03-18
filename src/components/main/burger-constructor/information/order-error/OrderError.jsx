//Дочерний элемент для вывода в модальное окно при ошибке создания заказа

import { TEXT_DEFAULT } from "../../../../../utils/constants";
import styles from "./OrderError.module.css";
import PropTypes from "prop-types";

const OrderError = (props) => {
    return (
        <section className={styles.errorContainer}>
            <div className={TEXT_DEFAULT}>
                Произошла ошибка: {props.errorName}.
            </div>
            <div className={TEXT_DEFAULT}>
                Пожалуйста, создайте заказ заново.
            </div>
        </section>
    );
};

OrderError.propTypes = {
    errorName: PropTypes.string.isRequired,
};

export default OrderError;
