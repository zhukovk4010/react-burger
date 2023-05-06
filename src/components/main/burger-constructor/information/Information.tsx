//Компонент с информацией о итоговой цене и кнопке "Оформить заказ"
//При клике вызывается модальное окно с информацией о заказе

//Импорты
import { getOrder } from "../../../../services/thunk/getOrderThunk";

import { closeOrderModalAction } from "../../../../services/actions/modal";

import Modal from "../../../modals/Modal";
import OrderDetails from "./order-details/OrderDetails";

import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TEXT_MEDIUM } from "../../../../utils/constants";
import styles from "./Information.module.css";
import OrderError from "./order-error/OrderError";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";

//Типы
type InformationPropsTypes = {
    totalPrice: number;
};

const Information = ({ totalPrice }: InformationPropsTypes) => {
    //Получаем нужные данные из state
    const { selectedIngredients, modal, order, auth } = useAppSelector(
        (state) => ({
            selectedIngredients: state.selectedIngredients,
            modal: state.modal,
            order: state.order,
            auth: state.user.isAuthenticated,
        })
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //Создание запроса
    //В нем созадется список id ингредиентов
    //Затем диспачим функции getOrder, которая изменяется состояние секции заказов
    //Если запрос успешный, тогда отркывается модальное окно и в нем показывается номер заказа из API
    //Если запрос неуспешный, тогда в модальном окне появляется сообщение, что произошла ошибка
    const createOrder = () => {
        if (auth) {
            const idList: Array<string> = [];
            if (typeof selectedIngredients.selectedBun?._id === "string") {
                idList.push(selectedIngredients.selectedBun._id);
            }
            for (
                let i = 0;
                i < selectedIngredients.selectedIngredientsData.length;
                i++
            ) {
                idList.push(
                    selectedIngredients.selectedIngredientsData[i].ingredient
                        ._id
                );
            }
            if (typeof selectedIngredients.selectedBun?._id === "string") {
                idList.push(selectedIngredients.selectedBun._id);
            }

            dispatch(getOrder(idList));
        } else {
            navigate("/login");
        }
    };

    //Если состояние модального окна заказа изменяется на true, отрисовывается модалка
    const modalContainer = (
        <>
            {modal.openOrderModal && (
                <Modal onClose={() => dispatch(closeOrderModalAction())}>
                    {order.hasError ? (
                        <OrderError errorName={order.errorName} />
                    ) : (
                        <OrderDetails orderNumber={order.numberOrder} />
                    )}
                </Modal>
            )}
        </>
    );

    return (
        <section className={`mt-10 ml-4 mr-4 ${styles.information}`}>
            <div className={styles.totalPrice}>
                <p className={TEXT_MEDIUM}>{totalPrice}</p>
                <div className={styles.icon}>
                    <CurrencyIcon type={"primary"} />
                </div>
            </div>
            {selectedIngredients.selectedBun ? (
                <Button
                    test-id="orderButton"
                    onClick={createOrder}
                    htmlType="button"
                    type="primary"
                    size="medium"
                >
                    Сделать заказ
                </Button>
            ) : (
                ""
            )}

            {modalContainer}
        </section>
    );
};

export default Information;
