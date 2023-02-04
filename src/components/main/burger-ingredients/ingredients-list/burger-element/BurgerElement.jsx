//Компонента, которая принимает данные ингридиента и возвращает отрисованный объект

import PropTypes from 'prop-types';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerElement.module.css';


const BurgerElement = props => {
    return (
        <div className={styles.ingredientsElement}>
            <Counter count={1} size="default" extraClass="m-1" />
            <div className={styles.imageContainer}>
                <img src={props.image} alt={props.name} />
            </div>
            <div className={styles.priceContainer}>
                <h4 className="text text_type_main-default">{props.price}</h4>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.nameContainer}>
                <h4 className='text text_type_main-default'>{props.name}</h4>
            </div>
        </div>
    );
}

BurgerElement.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}

export default BurgerElement;