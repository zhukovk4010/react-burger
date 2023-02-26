import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import PropTypes from 'prop-types';

import { deleteSelectedElement } from "../../../../services/actions/selected-ingredients/deleteIngredient";

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './SelectedIngredient.module.css'
import { ingredientType } from "../../../../utils/types";


const SelectedIngredient = props => {

    const dispatch = useDispatch()

    //Вытаскиваем секцию выбранных ингредиентов из хранилища
    const { selectedIngredientsData } = useSelector(store => ({
        selectedIngredientsData: store.selectedIngredients.selectedIngredientsData
    }))

    const ref = useRef(null);

    //Реализация сортировки
    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            props.moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: props.ingredient.dragId, index: props.index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    const preventDefault = (e) => e.preventDefault();

    drag(drop(ref));


    //Функция удаления ингредиента из конструктора
    const deleteIngredient = (index) => {
        const newIngredientArray = [...selectedIngredientsData]
        newIngredientArray.splice(index, 1);
        dispatch(deleteSelectedElement(newIngredientArray, props.ingredient.ingredientData.price))
    }

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
                handleClose={()=>{deleteIngredient(props.index)}}
                text={props.ingredient.ingredientData.name}
                price={props.ingredient.ingredientData.price}
                thumbnail={props.ingredient.ingredientData.image_mobile}
            />

        </section>
    )
}

SelectedIngredient.propTypes = {
    index: PropTypes.number.isRequired,
    ingredient: ingredientType,
    moveCard: PropTypes.func.isRequired
}

export default SelectedIngredient;