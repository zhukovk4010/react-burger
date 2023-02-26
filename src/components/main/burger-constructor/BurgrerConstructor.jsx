//Компонент конструктора бургера
//Инициализируем секцию для броска ингредиентов
//Булки отрисовываются отдельно
//Основые ингредиенты отрисовываются в компоненте SelectedIngredient

import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";

import { addSelectedIngredient } from "../../../services/actions/selected-ingredients/addSelectedIngredient";
import { updateSelectedIngredients } from "../../../services/actions/selected-ingredients/updateSelectedIngredients";
import { addBun } from "../../../services/actions/selected-ingredients/addBun";

import Information from "./information/Information";
import SelectedIngredient from './SelectedIngredient/SelectedIngredient';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './BurgerConstructor.module.css';
import { TEXT_MEDIUM } from "../../../utils/constants";


const BurgerConstructor = () => {

    //Вытаскиваем секцию выбранных элементов из хранилища
    const { selectedIngredients } = useSelector(store => ({
        selectedIngredients: store.selectedIngredients
    }))

    const dispatch = useDispatch();

    //Инициализация блока для броска ингредиента
    const [{ isHover }, dropTargerRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(element) {
            if (element.type === 'bun') {
                dispatch(addBun(element))
            } else {
                dispatch(addSelectedIngredient(element, uuid()))
            }
        }
    })

    //Функция изменения списка выбранных ингредиентов (без булки)
    //Передается в компонент SelectedIngredient
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = selectedIngredients.selectedIngredientsData[dragIndex];
        const newCards = [...selectedIngredients.selectedIngredientsData]

        newCards.splice(dragIndex, 1)

        newCards.splice(hoverIndex, 0, dragCard)

        dispatch(updateSelectedIngredients(newCards))
    }, [selectedIngredients.selectedIngredientsData, dispatch])


    //<Булки отрисовываются отдельно
    //Главные ингредиенты отрисовываются в компоненте SelectedIngredient
    return (
        <section className='mt-25'>
            <section ref={dropTargerRef} className={`${styles.burgerConstructor} ${isHover ? styles.onHover : ''}`}>
                {selectedIngredients.selectedBun ? (
                    <div className='ml-8'>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={selectedIngredients.selectedBun.name}
                            price={selectedIngredients.selectedBun.price}
                            thumbnail={selectedIngredients.selectedBun.image_mobile}
                        />
                    </div>
                ) : (<div className={`${styles.bunContainer} ${TEXT_MEDIUM}`}>
                        Выберете булку
                    </div>)}



                <section className={selectedIngredients.selectedIngredientsData[0] ? styles.changingIngredients : styles.changingIngredientsEmpty}>
                    {selectedIngredients.selectedIngredientsData[0] ? (selectedIngredients.selectedIngredientsData.map(
                        (ingredient, index) => {
                            return (
                                <SelectedIngredient key={ingredient.dragId} index={index} ingredient={ingredient} moveCard={moveCard} />
                            )
                        }
                    )) : (
                        <div className={`${styles.ingredientsContainer} ${TEXT_MEDIUM}`}>
                            Добавьте ингредиенты
                        </div>)}
                </section>

                {selectedIngredients.selectedBun && (
                    <div className='ml-8'>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={selectedIngredients.selectedBun.name}
                            price={selectedIngredients.selectedBun.price}
                            thumbnail={selectedIngredients.selectedBun.image_mobile}
                        />
                    </div>
                )}
            </section>
            <Information />
        </section>
    );
}


export default BurgerConstructor;