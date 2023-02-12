//Компонент с основным содержанием, в котором содержится 2 секции 
// с ингридиентами для бургера и выбраннами ингредиентами

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


export default Main;