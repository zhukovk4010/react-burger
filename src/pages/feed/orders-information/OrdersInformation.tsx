//Информация о заказах

//Импорты
import { useAppSelector } from "../../../hooks/hooks";
import {
    DIGITS_DEFAULT,
    DIGITS_LARGE,
    TEXT_MEDIUM,
} from "../../../utils/constants";
import styles from "./OrdersInformation.module.css";

const OrdersInformation = () => {
    const { orders, totalOrders, totalTodayOrders } = useAppSelector(
        (state) => ({
            orders: state.orders,
            totalOrders: state.orders.totalOrders,
            totalTodayOrders: state.orders.totalTodayOrders,
        })
    );

    //Готовые заказы
    const readyOrders = orders.orders.filter(
        (order) => order.status === "done"
    );

    //Заказы в работе
    const notReadyOrders = orders.orders.filter(
        (order) => order.status !== "done"
    );

    //Вытаскиваем первые 10 заказов для колонок
    const firstTenReadyOrders = readyOrders.splice(0, 9);
    const firstTenNotReadyOrders = notReadyOrders.splice(0, 9);

    return (
        <div>
            <div className={styles.ordersPanel}>
                <div>
                    <h3 className={`${TEXT_MEDIUM} mb-6`}>Готовы:</h3>
                    <div className={styles.ordersNumbers}>
                        {firstTenReadyOrders.map((order) => {
                            return (
                                <div
                                    key={order._id}
                                    className={`${DIGITS_DEFAULT} ${styles.readyOrder} mb-2`}
                                >
                                    {order.number}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h3 className={`${TEXT_MEDIUM} mb-6`}>В работе:</h3>
                    <div className={styles.ordersNumbers}>
                        {firstTenNotReadyOrders.map((order) => {
                            return (
                                <div
                                    key={order._id}
                                    className={`${DIGITS_DEFAULT} ${styles.notReadyOrder} mb-2`}
                                >
                                    {order.number}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.orderCounter}>
                <h3 className={`${TEXT_MEDIUM} mb-6`}>
                    Выполнено за все время:
                </h3>
                <div className={`${DIGITS_LARGE} ${styles.textShadow}`}>
                    {totalOrders}
                </div>
            </div>
            <div className={styles.orderCounter}>
                <h3 className={`${TEXT_MEDIUM} mb-6`}>Выполнено за сегодня:</h3>
                <div className={`${DIGITS_LARGE} ${styles.textShadow}`}>
                    {totalTodayOrders}
                </div>
            </div>
        </div>
    );
};

export default OrdersInformation;
