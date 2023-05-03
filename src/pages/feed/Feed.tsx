//Страница с лентой заказов

//Импорты
import { useEffect } from "react";
import { TEXT_LARGE, WS_URL } from "../../utils/constants";
import styles from "./Feed.module.css";
import OrdersFeed from "./orders-feed/OrdersFeed";
import OrdersInformation from "./orders-information/OrdersInformation";
import { useAppDispatch } from "../../hooks/hooks";
import { wsClose, wsConnect } from "../../services/actions/orders";

const Feed = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        //Открытие соединения
        dispatch(wsConnect(WS_URL));

        //Закрытие соединения
        return () => {
            dispatch(wsClose());
        };
    }, [dispatch]);

    return (
        <section className={styles.feedContainer}>
            <h2 className={`${TEXT_LARGE} mt-10 mb-5`}>Лента заказов</h2>
            <div className={styles.mainContent}>
                <OrdersFeed />
                <OrdersInformation />
            </div>
        </section>
    );
};

export default Feed;
