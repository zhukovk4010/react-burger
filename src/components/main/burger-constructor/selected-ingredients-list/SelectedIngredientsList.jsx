//Компонента выбранных ингредиентов
//Верхняя и нижняя булки закреплены
//Ингредиенты по середине могут быть в разном количестве

import {ingredientType} from '../../../../utils/types'

import SelectedIngredientElement from "./selected-ingredient-element/SelectedIngedientElement";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './SelectedIngredientsList.module.css';


const SelectedIngredientsList = props => {

    const selectedElements = props.ingredientsData.map((element, index) => {
        return (
            <SelectedIngredientElement key={index} selectedElement={element} />
        )
    })

    return (
        <section className={styles.selectedElements}>

            <div className='ml-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={props.ingredientsData[0].image_mobile}
                />
            </div>


            <div className={styles.changingIngredients}>
                {selectedElements}
            </div>

            <div className='ml-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={props.ingredientsData[0].image_mobile}
                />
            </div>
        </section>
    );
}

//Проверка данных из API
SelectedIngredientsList.propTypes = ingredientType;


export default SelectedIngredientsList;