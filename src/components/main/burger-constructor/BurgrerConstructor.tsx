//Компонент конструктора бургера
//Инициализируем секцию для броска ингредиентов
//Булки отрисовываются отдельно
//Основые ингредиенты отрисовываются в компоненте SelectedIngredient

//Импорты
import { useCallback, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import { addSelectedIngredientAction } from "../../../services/actions/selectedIngredients";
import { updateSelectedIngredients } from "../../../services/actions/selectedIngredients";
import { addBunAction } from "../../../services/actions/selectedIngredients";

import Information from "./information/Information";
import SelectedIngredient from "./SelectedIngredient/SelectedIngredient";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerConstructor.module.css";
import { TEXT_MEDIUM } from "../../../utils/constants";
import {
    AppStateType,
    DispatchType,
} from "../../../services/reducers/rootReducer";

const BurgerConstructor = () => {
    //Вытаскиваем секцию выбранных элементов из хранилища
    const { selectedIngredients } = useSelector((state: AppStateType) => ({
        selectedIngredients: state.selectedIngredients,
    }));

    const dispatch = useDispatch<DispatchType>();

    //Вычесление итоговой стоимости
    const totalPrice = useMemo(() => {
        let price = 0;
        if (selectedIngredients.selectedBun) {
            price = selectedIngredients.selectedBun.price * 2;
        }
        if (selectedIngredients.selectedIngredientsData.length !== 0) {
            for (
                let i = 0;
                i < selectedIngredients.selectedIngredientsData.length;
                i++
            ) {
                price =
                    price +
                    selectedIngredients.selectedIngredientsData[i].ingredient
                        .price;
            }
        }
        return price;
    }, [selectedIngredients]);

    //Инициализация блока для броска ингредиента
    const [{ isHover }, dropTargerRef] = useDrop({
        accept: "ingredient",
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
        drop(element: any) {
            if (element.type === "bun") {
                dispatch(addBunAction(element));
            } else {
                dispatch(addSelectedIngredientAction(element));
            }
        },
    });

    //Функция изменения списка выбранных ингредиентов (без булки)
    //Передается в компонент SelectedIngredient
    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            const dragCard =
                selectedIngredients.selectedIngredientsData[dragIndex];
            const newCards = [...selectedIngredients.selectedIngredientsData];

            newCards.splice(dragIndex, 1);

            newCards.splice(hoverIndex, 0, dragCard);

            dispatch(updateSelectedIngredients(newCards));
        },
        [selectedIngredients.selectedIngredientsData, dispatch]
    );

    //<Булки отрисовываются отдельно
    //Главные ингредиенты отрисовываются в компоненте SelectedIngredient
    return (
        <section className="mt-25">
            <section
                ref={dropTargerRef}
                className={`${styles.burgerConstructor} ${
                    isHover ? styles.onHover : ""
                }`}
            >
                {selectedIngredients.selectedBun ? (
                    <div className="ml-8">
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${selectedIngredients.selectedBun.name} (верх)`}
                            price={selectedIngredients.selectedBun.price}
                            thumbnail={
                                selectedIngredients.selectedBun.image_mobile
                            }
                        />
                    </div>
                ) : (
                    <div className={`${styles.bunContainer} ${TEXT_MEDIUM}`}>
                        Выберете булку
                    </div>
                )}

                <section
                    className={
                        selectedIngredients.selectedIngredientsData[0]
                            ? styles.changingIngredients
                            : styles.changingIngredientsEmpty
                    }
                >
                    {selectedIngredients.selectedIngredientsData[0] ? (
                        selectedIngredients.selectedIngredientsData.map(
                            (ingredient, index) => {
                                return (
                                    <SelectedIngredient
                                        key={ingredient.dragId}
                                        index={index}
                                        ingredient={ingredient}
                                        moveCard={moveCard}
                                    />
                                );
                            }
                        )
                    ) : (
                        <div
                            className={`${styles.ingredientsContainer} ${TEXT_MEDIUM}`}
                        >
                            Добавьте ингредиенты
                        </div>
                    )}
                </section>

                {selectedIngredients.selectedBun && (
                    <div className="ml-8">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${selectedIngredients.selectedBun.name} (низ)`}
                            price={selectedIngredients.selectedBun.price}
                            thumbnail={
                                selectedIngredients.selectedBun.image_mobile
                            }
                        />
                    </div>
                )}
            </section>
            <Information totalPrice={totalPrice} />
        </section>
    );
};

export default BurgerConstructor;
