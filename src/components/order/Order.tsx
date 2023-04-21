//Экземпляр заказа

//Импорты
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    DIGITS_DEFAULT,
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../utils/constants";
import styles from "./Order.module.css";
import { IngredientIcon } from "./ingredient-icon/IngredientIcon";
import { Link, useLocation } from "react-router-dom";
import { openOrderDetailsModalAction } from "../../services/actions/modal";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IngredientType, WsOrderType } from "../../types/types";

//Типы
type OrderPropsType = {
    order: WsOrderType;
};

const Order = ({ order }: OrderPropsType) => {
    const { ingredientsData } = useAppSelector((state) => ({
        ingredientsData: state.ingredients.ingredientsData,
    }));
    const dispatch = useAppDispatch();
    const location = useLocation();

    //Стоимость заказа
    let orderTotalPrice: number = 0;
    let ingredients: Array<IngredientType> = [];
    order.ingredients.forEach((item) => {
        let ingredient = ingredientsData.find((el) => el._id === item);
        if (ingredient) {
            orderTotalPrice += ingredient.price;
            if (ingredients.length < 6) ingredients.push(ingredient);
        }
    });

    //Формирование иконок ингредиентов
    const icons = ingredients.map((el, index) => (
        <IngredientIcon
            key={index}
            src={el.image_mobile}
            srcSet={el.image_mobile}
            overflow={!index ? order.ingredients.length - 6 : 0}
            extraClass="items_picture"
        />
    ));

    const date = new Date(order.createdAt);

    //Добавление 0 в дату, если число меньше 10
    const addLeadingZero = (d: any) => {
        return d < 10 ? "0" + d : d;
    };

    const openModal = () => {
        dispatch(openOrderDetailsModalAction());
    };
    return (
        <Link
            key={order.number}
            to={{ pathname: `${location.pathname}/${order.number}` }}
            state={{ background: location }}
            onClick={openModal}
            className={styles.link}
        >
            <div className={styles.orderContainer}>
                <div className={styles.orderInformation}>
                    <h4 className={`${DIGITS_DEFAULT} ${styles.orderNumber}`}>
                        {`#${order.number}`}
                    </h4>
                    <h4
                        className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR} ${styles.orderTime}`}
                    >
                        {`${date.getFullYear()}.${addLeadingZero(
                            date.getMonth()
                        )}.${addLeadingZero(date.getDate())}, ${addLeadingZero(
                            date.getHours()
                        )}:${addLeadingZero(date.getMinutes())}`}
                    </h4>
                </div>
                <h3 className={`${TEXT_MEDIUM} ${styles.burgerName}`}>
                    {order.name}
                </h3>
                <h3
                    className={
                        order.status === "done"
                            ? styles.activeStatus + " " + TEXT_DEFAULT
                            : styles.inActiveStatus + " " + TEXT_DEFAULT
                    }
                >
                    {order.status === "done" ? "Выполнен" : "В работе"}
                </h3>
                <div className={styles.orderDetails}>
                    <div className={styles.itemsList}>{icons}</div>
                    <div className={styles.totalPrice}>
                        <h3 className={DIGITS_DEFAULT}>{orderTotalPrice}</h3>
                        {<CurrencyIcon type="primary" />}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Order;
