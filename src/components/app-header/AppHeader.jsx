//Компонент "Навигационная панель", внутри нее навигация, логотип и переход в личный кабинет
import NavigationLink from "./navigation-link/NavigationLink";

import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <div className={styles.leftSideHeader}>
                    <NavLink to="/" className={styles.link}>
                        <NavigationLink
                            iconType="BurgerIcon"
                            name="Конструктор"
                        />
                    </NavLink>

                    <NavLink className={styles.link}>
                        <NavigationLink
                            iconType="ListIcon"
                            name="Лента заказов"
                        />
                    </NavLink>
                </div>
                <div className={styles.logoContainer}>
                    <Logo />
                </div>

                <div className={styles.profileLink}>
                    <NavLink to="/profile" className={styles.link}>
                        <NavigationLink
                            iconType="ProfileIcon"
                            name="Личный кабинет"
                        />
                    </NavLink>
                </div>
            </header>
        </div>
    );
};

export default AppHeader;
