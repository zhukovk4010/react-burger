//Компонента выбранных ингредиентов
//Верхняя и нижняя булки закреплены
//Ингредиенты по середине могут быть в разном количестве

import PropTypes from 'prop-types';

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import SelectedIngredientElement from "./selected-ingredient-element/SelectedIngedientElement";

import styles from './SelectedIngredientsList.module.css';


const SelectedIngredientsList = props => {
    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

            <div className='ml-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={props.data[0].image_mobile}
                />
            </div>


            <div className={styles.changingIngredients}>
                <SelectedIngredientElement selectedElement={props.data[2]} />
                <SelectedIngredientElement selectedElement={props.data[2]} />
                <SelectedIngredientElement selectedElement={props.data[2]} />
                <SelectedIngredientElement selectedElement={props.data[2]} />
                <SelectedIngredientElement selectedElement={props.data[2]} />
                <SelectedIngredientElement selectedElement={props.data[2]} />
                <SelectedIngredientElement selectedElement={props.data[2]} />
                <SelectedIngredientElement selectedElement={props.data[2]} />
            </div>

            <div className='ml-6'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={props.data[0].image_mobile}
                />
            </div>
        </section>
    );
}

SelectedIngredientsList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
    })).isRequired
}


export default SelectedIngredientsList;