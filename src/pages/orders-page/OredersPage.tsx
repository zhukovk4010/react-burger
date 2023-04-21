// Страница заказов

//Импорты
import { useEffect } from "react";
import Order from "../../components/order/Order";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./OredersPage.module.css";
import { wsClose, wsConnect } from "../../services/actions/orders";
import { WS_URL_USER } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { WsOrderType } from "../../types/types";

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => ({
        orders: state.orders.orders,
    }));

    //Подключаем к ws с accessToken
    useEffect(() => {
        const accessToken = getCookie("accessToken");

        dispatch(wsConnect(`${WS_URL_USER}?token=${accessToken}`));
        return () => {
            dispatch(wsClose());
        };
    }, [dispatch]);

    //Когда заказы будут в state, тогда приозойдет отрисовка
    if (orders) {
        return (
            <section className={styles.ordersContainer}>
                {orders.map((order: WsOrderType) => {
                    return <Order key={order._id} order={order} />;
                })}
            </section>
        );
    }

    return null;
};

export default OrdersPage;
