//Компонент элемента из конструктора

//Импорты
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { deleteSelectedIngredientAction } from "../../../../services/actions/selectedIngredients";

import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./SelectedIngredient.module.css";
import { SelectedIngredientType } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";

//Типы
type SelectedIngredientPropsType = {
    index: number;
    ingredient: SelectedIngredientType;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
};

const SelectedIngredient = ({
    index,
    ingredient,
    moveCard,
}: SelectedIngredientPropsType) => {
    const dispatch = useAppDispatch();

    //Вытаскиваем секцию выбранных ингредиентов из хранилища
    const { selectedIngredientsData } = useAppSelector((state) => ({
        selectedIngredientsData:
            state.selectedIngredients.selectedIngredientsData,
    }));

    const ref = useRef<HTMLInputElement>(null);

    //Реализация сортировки
    const [{ handlerId }, drop] = useDrop({
        accept: "component",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset: any = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "component",
        item: () => ({ id: ingredient.dragId, index: index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    const preventDefault = (e: any): void => e.preventDefault();

    drag(drop(ref));

    //Функция удаления ингредиента из конструктора
    const deleteIngredient = (index: number) => {
        const newIngredientArray = [...selectedIngredientsData];
        newIngredientArray.splice(index, 1);
        dispatch(deleteSelectedIngredientAction(newIngredientArray));
    };

    return (
        <section
            ref={ref}
            style={{ opacity }}
            onDrop={preventDefault}
            className={styles.wrapper}
            data-handler-id={handlerId}
        >
            <div>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                handleClose={() => {
                    deleteIngredient(index);
                }}
                text={ingredient.ingredient.name}
                price={ingredient.ingredient.price}
                thumbnail={ingredient.ingredient.image_mobile}
            />
        </section>
    );
};

export default SelectedIngredient;
