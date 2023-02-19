//Компонент с основным содержанием, в котором содержится 2 секции 
// с ингридиентами для бургера и выбраннами ингредиентами

import BurgerConstructor from './burger-constructor/BurgrerConstructor';
import BurgerIngredients from './burger-ingredients/BurgerIngredients';

import styles from './Main.module.css';


const Main = () => {
    return (
        <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    );
}


export default Main;