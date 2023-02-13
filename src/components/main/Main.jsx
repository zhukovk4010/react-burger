//Компонент с основным содержанием, в котором содержится 2 секции 
// с ингридиентами для бургера и выбраннами ингредиентами

import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

import BurgerConstructor from './burger-constructor/BurgrerConstructor';
import BurgerIngredients from './burger-ingredients/BurgerIngredients';

import styles from './Main.module.css';


const Main = props => {
    return (
        <main className={styles.main}>
            <BurgerIngredients ingredientsData={props.ingredientsData} />
            <BurgerConstructor ingredientsData={props.ingredientsData} />
        </main>
    );
}

Main.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType).isRequired
}


export default Main;