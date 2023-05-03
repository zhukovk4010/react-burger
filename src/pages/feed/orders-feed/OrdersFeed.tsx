//Лента заказов

//Импорты
import styles from "./OrdersFeed.module.css";
import Order from "../../../components/order/Order";
import { useAppSelector } from "../../../hooks/hooks";

const OrdersFeed = () => {
    const { orders } = useAppSelector((state) => ({
        orders: state.orders.orders,
    }));

    return (
        <section className={styles.ordersContainer}>
            {orders.map((order) => {
                return <Order key={order._id} order={order} />;
            })}
        </section>
    );
};

export default OrdersFeed;
