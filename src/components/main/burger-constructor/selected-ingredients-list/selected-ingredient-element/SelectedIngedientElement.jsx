//Компонент принимающий данные о выбранном ингредиенте между булок

import {ingredientType} from '../../../../../utils/types';

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
    selectedElement: ingredientType,
}


export default SelectedIngredientElement;