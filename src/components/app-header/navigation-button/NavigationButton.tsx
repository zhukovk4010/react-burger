//Компонент кнопки в навигации

//Импорты
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import {
    BurgerIcon,
    ProfileIcon,
    ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TEXT_DEFAULT } from "../../../utils/constants";
import styles from "./NavigationButton.module.css";
import { AppStateType } from "../../../services/reducers/rootReducer";

//Типы
type NavigationButtonPropsType = {
    iconType: string;
    name: string;
};

const NavigationButton = ({ iconType, name }: NavigationButtonPropsType) => {
    const { selectedIngredient } = useSelector((store: AppStateType) => ({
        selectedIngredient: store.selectedIngredient,
    }));

    const location = useLocation();
    const activeIconRoute = location.pathname;
    return (
        <div className={styles.button}>
            {iconType === "BurgerIcon" && (
                <>
                    <BurgerIcon
                        type={
                            activeIconRoute === "/" ||
                            selectedIngredient.selectedIngredient !== null
                                ? "primary"
                                : "secondary"
                        }
                    />
                    <p
                        className={
                            activeIconRoute === "/" ||
                            selectedIngredient.selectedIngredient !== null
                                ? `${TEXT_DEFAULT} ${styles.activeLinkName}`
                                : `${TEXT_DEFAULT} ${styles.linkName}`
                        }
                    >
                        {name}
                    </p>
                </>
            )}
            {iconType === "ListIcon" && (
                <>
                    <ListIcon
                        type={
                            activeIconRoute === "/order-feed"
                                ? "primary"
                                : "secondary"
                        }
                    />
                    <p
                        className={
                            activeIconRoute === "/order-feed"
                                ? `${TEXT_DEFAULT} ${styles.activeLinkName}`
                                : `${TEXT_DEFAULT} ${styles.linkName}`
                        }
                    >
                        {name}
                    </p>
                </>
            )}
            {iconType === "ProfileIcon" && (
                <>
                    <ProfileIcon
                        type={
                            activeIconRoute === "/profile" ||
                            activeIconRoute === "/profile/orders"
                                ? "primary"
                                : "secondary"
                        }
                    />
                    <p
                        className={
                            activeIconRoute === "/profile" ||
                            activeIconRoute === "/profile/orders"
                                ? `${TEXT_DEFAULT} ${styles.activeLinkName}`
                                : `${TEXT_DEFAULT} ${styles.linkName}`
                        }
                    >
                        {name}
                    </p>
                </>
            )}
        </div>
    );
};

export default NavigationButton;
