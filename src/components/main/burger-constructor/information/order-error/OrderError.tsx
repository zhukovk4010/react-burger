//Дочерний элемент для вывода в модальное окно при ошибке создания заказа

//Импорты
import { TEXT_DEFAULT } from "../../../../../utils/constants";
import styles from "./OrderError.module.css";

//Типы
type OrderErrorPropsType = {
    errorName: string;
};

const OrderError = ({ errorName }: OrderErrorPropsType) => {
    return (
        <section className={styles.errorContainer}>
            <div className={TEXT_DEFAULT}>Произошла ошибка: {errorName}.</div>
            <div className={TEXT_DEFAULT}>
                Пожалуйста, создайте заказ заново.
            </div>
        </section>
    );
};

export default OrderError;
