//Компонента выбранных ингредиентов
//Верхняя и нижняя булки закреплены
//Ингредиенты по середине могут быть в разном количестве

import { useContext, useEffect } from 'react';

import { IngredientsContext } from '../../../../utils/context';

import SelectedIngredientElement from "./selected-ingredient-element/SelectedIngedientElement";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './SelectedIngredientsList.module.css';


const SelectedIngredientsList = () => {

    //Получаем данные ингредиентов через контекс
    const { state, dispatch } = useContext(IngredientsContext);

    //Добавление ингредиентов в конструктор
    //При разном количестве изменяется цена
    //Если повторно добавить ингредиент булки, то он перезапишет старое значение, а из итоговой цены вычетаются
    //предыдущие значения цен на булки и добавляются новые
    useEffect(() => {
        dispatch({ type: 'addSelectedIngredient', ingredient: state.ingredients[0] });
        dispatch({ type: 'addSelectedIngredient', ingredient: state.ingredients[2] });
        dispatch({ type: 'addSelectedIngredient', ingredient: state.ingredients[3] });
        dispatch({ type: 'addSelectedIngredient', ingredient: state.ingredients[4] });
        dispatch({ type: 'addSelectedIngredient', ingredient: state.ingredients[8] });
        dispatch({ type: 'addSelectedIngredient', ingredient: state.ingredients[6] });
    }, [])


    return (
        <section className={styles.selectedElements}>

            <div className='ml-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${state.selectedIngredients.bun.name} (верх)`}
                    price={state.selectedIngredients.bun.price}
                    thumbnail={state.selectedIngredients.bun.image_mobile}
                />
            </div>


            <div className={styles.changingIngredients}>
                {state.selectedIngredients.otherIngredients.map((element) => {
                    return (
                        <SelectedIngredientElement key={element._id} selectedElement={element} />
                    )
                })}
            </div>

            <div className='ml-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${state.selectedIngredients.bun.name} (низ)`}
                    price={state.selectedIngredients.bun.price}
                    thumbnail={state.selectedIngredients.bun.image_mobile}
                />
            </div>
        </section>
    );
}


export default SelectedIngredientsList;