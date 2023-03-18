//Компонент с основным содержанием, в котором содержится 2 секции
// с ингридиентами для бургера и выбраннами ингредиентами
//Оборачиваем 2 секции Dnd провайдером

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "./burger-constructor/BurgrerConstructor";
import BurgerIngredients from "./burger-ingredients/BurgerIngredients";

import styles from "./Main.module.css";

const Main = () => {
    return (
        <>
            <main className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </>
    );
};

export default Main;
