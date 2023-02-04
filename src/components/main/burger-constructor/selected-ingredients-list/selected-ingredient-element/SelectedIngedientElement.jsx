//Компонент принимающий данные о выбранном ингредиенте между булок

import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './SelectedIngredientElement.module.css';


const SelectedIngredientElement = props => {
    return (
        <div className={styles.selectedElement}>
            <div>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={props.selectedElement.name}
                price={props.selectedElement.price}
                thumbnail={props.selectedElement.image_mobile}
            />
        </div>
    );
}

SelectedIngredientElement.propTypes = {
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


export default SelectedIngredientElement;