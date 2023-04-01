//Компонента, которая принимает данные ингридиента и возвращает отрисованный объект
//При клике отрисовыается модальное окно
//Можно перетаскивать ингредиенты

//Импорты
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { addSelectedIngredientToModal } from "../../../../../services/actions/selectedIngredient";
import { openIngredientModalAction } from "../../../../../services/actions/modal";
import { TEXT_DEFAULT } from "../../../../../utils/constants";

import { IngredientType } from "../../../../../types/types";
import { AppStateType } from "../../../../../services/reducers/rootReducer";

import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientElement.module.css";

//Типы
type IngredientElementPropsType = {
    ingredient: IngredientType;
};

const IngredientElement = ({ ingredient }: IngredientElementPropsType) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const id = ingredient["_id"];

    //Выбираем секцию выбранных ингредиентов в конструкторе из хранилища
    const { selectedIngredients } = useSelector((state: AppStateType) => ({
        selectedIngredients: state.selectedIngredients,
    }));

    //Вещаем на ингредиент возможность перетаскивания
    const [{ opacity }, dragRef] = useDrag({
        type: "ingredient",
        item: { ...ingredient },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });

    //Реализация счетчика
    //Топорная версия

    // количество данного ингредиента в конструкторе
    let count = 0;
    //Состояния счетчика
    let activeCount: boolean | undefined;

    //Если в хранилище есть выбранная булка и тип ингрента булка
    if (selectedIngredients.selectedBun && ingredient.type === "bun") {
        //Если id выбранной булки из хранилища и отрисовываемой булки равны изменяем счетчик
        if (selectedIngredients.selectedBun._id === ingredient._id) {
            count = 2;
            activeCount = true;
        }
        //Если список выбранный ингредиентов (без учета булки) не равен нулю
    } else if (selectedIngredients.selectedIngredientsData.length !== 0) {
        //Запускаем цикл, который проходится по списку и проверяет совпадения
        //Количество подсчитывается
        for (
            let i = 0;
            i < selectedIngredients.selectedIngredientsData.length;
            i++
        ) {
            if (
                selectedIngredients.selectedIngredientsData[i].ingredient
                    ._id === ingredient._id
            ) {
                count = count + 1;
                activeCount = true;
            }
        }
    }

    //Функция открытия модального окна
    //Включается модальное окно и и помещает в хранилище выбранный элемент
    const openModal = (ingredient: IngredientType) => {
        dispatch(addSelectedIngredientToModal(ingredient));
        dispatch(openIngredientModalAction());
    };

    return (
        <Link
            className={styles.linkIngredient}
            key={id}
            to={{
                pathname: `/ingredients/${id}`,
            }}
            state={{ background: location }}
            onClick={() => openModal(ingredient)}
        >
            <div style={{ opacity }} className={styles.ingredientsElement}>
                {activeCount && (
                    <Counter count={count} size="default" extraClass="m-1" />
                )}
                <div ref={dragRef} className={styles.imageContainer}>
                    <img src={ingredient.image} alt={ingredient.name} />
                </div>
                <div className={styles.priceContainer}>
                    <h4 className={TEXT_DEFAULT}>{ingredient.price}</h4>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={styles.nameContainer}>
                    <h4 className={TEXT_DEFAULT}>{ingredient.name}</h4>
                </div>
            </div>
        </Link>
    );
};

export default IngredientElement;
