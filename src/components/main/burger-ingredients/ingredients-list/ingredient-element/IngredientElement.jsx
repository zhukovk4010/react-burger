//Компонента, которая принимает данные ингридиента и возвращает отрисованный объект

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TEXT_DEFAULT } from '../../../../../utils/fontsStyles';
import styles from './IngredientElement.module.css';


//При клике открыется модальное окно

const BurgerElement = props => {
    return (
        <div onClick={() => {
            props.openModal(props.element)
        }} className={styles.ingredientsElement}>
            <Counter count={1} size="default" extraClass="m-1" />
            <div className={styles.imageContainer}>
                <img src={props.element.image} alt={props.element.name} />
            </div>
            <div className={styles.priceContainer}>
                <h4 className={TEXT_DEFAULT}>{props.element.price}</h4>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.nameContainer}>
                <h4 className={TEXT_DEFAULT}>{props.element.name}</h4>
            </div>
        </div>
    );
}


export default BurgerElement;