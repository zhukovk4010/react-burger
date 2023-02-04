//Компонент с основным содержанием, в котором содержится 2 секции 
// с ингридиентами для бургера и выбраннами ингредиентами

import PropTypes from 'prop-types';

import BurgerConstructor from './burger-constructor/BurgrerConstructor';
import BurgerIngredients from './burger-ingredients/BurgerIngredients';

import styles from './Main.module.css';


const Main = props => {
    return (
        <main className={styles.main}>
            <BurgerIngredients data={props.data} />
            <BurgerConstructor data={props.data} />
        </main>
    );
}

Main.propTypes = {
    data: PropTypes.array.isRequired
}


export default Main;