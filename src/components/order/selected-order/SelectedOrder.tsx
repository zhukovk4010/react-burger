//Компонент выбранного заказа

//Импорты
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    DIGITS_DEFAULT,
    TEXT_DEFAULT,
    TEXT_INACTIVE_COLOR,
    TEXT_MEDIUM,
} from "../../../utils/constants";
import styles from "./SelectedOrder.module.css";
import { IngredientIcon } from "../ingredient-icon/IngredientIcon";
import { useLocation, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { IngredientType } from "../../../types/types";
import { useEffect } from "react";
import { getOrderFromApi } from "../../../services/thunk/getOrderThunk";
import { orderClear } from "../../../services/actions/order";

//Типы
type modalIngredientType = {
    id: number;
    count: number;
    ingredient: IngredientType;
};

type IngredientsListType = Array<modalIngredientType>;

const SelectedOrder = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { number } = useParams();
    const { ingredientsData, order } = useAppSelector((state) => ({
        ingredientsData: state.ingredients.ingredientsData,
        order: state.order.orderData,
    }));

    //Получаем нужный заказ с сервера
    useEffect(() => {
        dispatch(getOrderFromApi(number));
        return () => {
            dispatch(orderClear());
        };
    }, [dispatch, number]);

    let date;
    let background = location.state && location.state.background;

    //Итоговый список ингредиентов
    let ingredientsList: IngredientsListType = [];
    let totalPrice: number = 0;

    //Добавление 0 в дату, если число меньше 10
    const addLeadingZero = (d: number | undefined) => {
        if (d) {
            return d < 10 ? "0" + d : d;
        }
    };

    if (order) {
        date = new Date(order!.createdAt);
        for (let i = 0; i < order.ingredients.length; i++) {
            const selectedIngredient = ingredientsData.find(
                (element) => element._id === order.ingredients[i]
            );
            if (selectedIngredient) {
                totalPrice += selectedIngredient.price;
                if (ingredientsList) {
                    const recurringIngredient = ingredientsList.find(
                        (element) =>
                            element.ingredient._id === selectedIngredient._id
                    );
                    if (recurringIngredient) {
                        ingredientsList[recurringIngredient.id].count += 1;
                        continue;
                    }
                }

                ingredientsList.push({
                    id: i,
                    count: 1,
                    ingredient: selectedIngredient,
                });
            }
        }
    }

    if (order === null) {
        return <div>Ожидайте</div>;
    }

    return (
        <>
            {background ? (
                <section className={styles.orderContainer}>
                    <h4 className={`${DIGITS_DEFAULT} ${styles.title}`}>
                        {`#${order?.number}`}
                    </h4>
                    <h3 className={`${TEXT_MEDIUM} ${styles.burgerName}`}>
                        {order?.name}
                    </h3>
                    <h4
                        className={
                            order?.status === "done"
                                ? TEXT_DEFAULT + " " + styles.status
                                : TEXT_DEFAULT
                        }
                    >
                        {order?.status === "done" ? "Выполнен" : "В работе"}
                    </h4>
                    <h3 className={`${TEXT_MEDIUM} mb-6`}>Состав</h3>
                    <div className={styles.orderCompound}>
                        {ingredientsList.map((element) => {
                            return (
                                <div
                                    key={element.id}
                                    className={styles.ingredientInformation}
                                >
                                    <IngredientIcon
                                        src={element.ingredient.image_mobile}
                                        srcSet={element.ingredient.image_mobile}
                                    />
                                    <div
                                        className={styles.nameAndPriceContainer}
                                    >
                                        <h4 className={TEXT_DEFAULT}>
                                            {element.ingredient.name}
                                        </h4>
                                        <div className={styles.totalPrice}>
                                            <h4 className={`${DIGITS_DEFAULT}`}>
                                                {`${element.count} x ${element.ingredient.price}`}
                                            </h4>
                                            {<CurrencyIcon type="primary" />}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.information}>
                        <h4
                            className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR} ${styles.orderTime}`}
                        >
                            {`${date?.getFullYear()}.${addLeadingZero(
                                date?.getMonth()
                            )}.${addLeadingZero(
                                date?.getDate()
                            )}, ${addLeadingZero(
                                date?.getHours()
                            )}:${addLeadingZero(date?.getMinutes())}`}
                        </h4>
                        <div className={styles.totalPrice}>
                            <h4 className={`${DIGITS_DEFAULT}`}>
                                {totalPrice}
                            </h4>
                            {<CurrencyIcon type="primary" />}
                        </div>
                    </div>
                </section>
            ) : (
                <div className="mt-30">
                    <section className={styles.orderContainerNoModal}>
                        <h4 className={`${DIGITS_DEFAULT} ${styles.title}`}>
                            {`#${order?.number}`}
                        </h4>
                        <h3 className={`${TEXT_MEDIUM} ${styles.burgerName}`}>
                            {order?.name}
                        </h3>
                        <h4
                            className={
                                order?.status === "done"
                                    ? TEXT_DEFAULT + " " + styles.status
                                    : TEXT_DEFAULT
                            }
                        >
                            {order?.status === "done" ? "Выполнен" : "В работе"}
                        </h4>
                        <h3 className={`${TEXT_MEDIUM} mb-6`}>Состав</h3>
                        <div className={styles.orderCompound}>
                            {ingredientsList.map((element) => {
                                return (
                                    <div
                                        key={element.id}
                                        className={styles.ingredientInformation}
                                    >
                                        <IngredientIcon
                                            src={
                                                element.ingredient.image_mobile
                                            }
                                            srcSet={
                                                element.ingredient.image_mobile
                                            }
                                        />
                                        <div
                                            className={
                                                styles.nameAndPriceContainer
                                            }
                                        >
                                            <h4 className={TEXT_DEFAULT}>
                                                {element.ingredient.name}
                                            </h4>
                                            <div className={styles.totalPrice}>
                                                <h4
                                                    className={`${DIGITS_DEFAULT}`}
                                                >
                                                    {`${element.count} x ${element.ingredient.price}`}
                                                </h4>
                                                {
                                                    <CurrencyIcon type="primary" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.information}>
                            <h4
                                className={`${TEXT_DEFAULT} ${TEXT_INACTIVE_COLOR} ${styles.orderTime}`}
                            >
                                {`${date?.getFullYear()}.${addLeadingZero(
                                    date?.getMonth()
                                )}.${addLeadingZero(
                                    date?.getDate()
                                )}, ${addLeadingZero(
                                    date?.getHours()
                                )}:${addLeadingZero(date?.getMinutes())}`}
                            </h4>
                            <div className={styles.totalPrice}>
                                <h4 className={`${DIGITS_DEFAULT}`}>
                                    {totalPrice}
                                </h4>
                                {<CurrencyIcon type="primary" />}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default SelectedOrder;
