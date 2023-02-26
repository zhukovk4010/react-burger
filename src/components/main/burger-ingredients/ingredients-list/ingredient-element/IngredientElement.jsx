//Компонента, которая принимает данные ингридиента и возвращает отрисованный объект
//При клике отрисовыается модальное окно
//Можно перетаскивать ингредиенты

import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import { addSelectedIngredientModal } from '../../../../../services/actions/selectedIngredient/addSelectedIngredientModal';
import { openIngredientModal } from '../../../../../services/actions/modal/openIngredientModal';

import { ingredientType } from '../../../../../utils/types';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TEXT_DEFAULT } from '../../../../../utils/constants';
import styles from './IngredientElement.module.css';


const BurgerElement = props => {

    //Выбираем секцию выбранных ингредиентов в конструкторе из хранилища
    const { selectedIngredients } = useSelector(store => ({
        selectedIngredients: store.selectedIngredients
    }))

    //Вещаем на ингредиент возможность перетаскивания
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { ...props.ingredient },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    //Реализация счетчика
    //Топорная версия
    
    // количество данного ингредиента в конструкторе
    let count = 0;
    //Состояния счетчика
    let activeCount;

    //Если в хранилище есть выбранная булка и тип ингрента булка
    if (selectedIngredients.selectedBun && props.ingredient.type === 'bun') {
        //Если id выбранной булки из хранилища и отрисовываемой булки равны изменяем счетчик
        if (selectedIngredients.selectedBun._id === props.ingredient._id) {
            count = 2;
            activeCount = true
        }
        //Если список выбранный ингредиентов (без учета булки) не равен нулю
    } else if(selectedIngredients.selectedIngredientsData.length != 0) {
        //Запускаем цикл, который проходится по списку и проверяет совпадения
        //Количество подсчитывается
        for (let i = 0; i < selectedIngredients.selectedIngredientsData.length; i++) {
            if (selectedIngredients.selectedIngredientsData[i].ingredientData._id === props.ingredient._id) {
                count = count + 1;
                activeCount = true
            }
        }
    }

    const dispatch = useDispatch();


    //Функция открытия модального окна
    //Включается модальное окно и и помещает в хранилище выбранный элемент
    const openModal = (ingredient) => {
        dispatch(addSelectedIngredientModal(ingredient))
        dispatch(openIngredientModal())
    } 


    return (
        <div style={{ opacity }} onClick={() => {openModal(props.ingredient)}} className={styles.ingredientsElement}>
            {activeCount && <Counter count={count} size="default" extraClass="m-1" />}
            <div ref={dragRef} className={styles.imageContainer}>
                <img src={props.ingredient.image} alt={props.ingredient.name} />
            </div>
            <div className={styles.priceContainer}>
                <h4 className={TEXT_DEFAULT}>{props.ingredient.price}</h4>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.nameContainer}>
                <h4 className={TEXT_DEFAULT}>{props.ingredient.name}</h4>
            </div>
        </div>
    );
}

BurgerElement.propTypes = {
    ingredient: ingredientType,
}


export default BurgerElement;