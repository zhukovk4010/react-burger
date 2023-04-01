//Компонент переключателей

//Импорты
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Tabs.module.css";

//Типы
type TabsPropsType = {
    current: string;
    onClick: (value: string) => void;
};

const Tabs = ({ current, onClick }: TabsPropsType) => {
    //Функционал перехода к нужным ингредиентам по клику еще не реализован
    return (
        <div className={styles.tabs}>
            <Tab value="one" onClick={onClick} active={current === "one"}>
                Булки
            </Tab>
            <Tab value="two" onClick={onClick} active={current === "two"}>
                Соусы
            </Tab>
            <Tab value="three" onClick={onClick} active={current === "three"}>
                Начинки
            </Tab>
        </div>
    );
};

export default Tabs;
