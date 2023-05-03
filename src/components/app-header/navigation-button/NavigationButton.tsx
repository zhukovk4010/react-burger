//Компонент кнопки в навигации

//Импорты
import { useLocation } from "react-router";

import {
    BurgerIcon,
    ProfileIcon,
    ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TEXT_DEFAULT } from "../../../utils/constants";
import styles from "./NavigationButton.module.css";

//Типы
type NavigationButtonPropsType = {
    iconType: string;
    name: string;
};

const NavigationButton = ({ iconType, name }: NavigationButtonPropsType) => {
    const location = useLocation();
    const activeIconRoute = location.pathname;
    return (
        <div className={styles.button}>
            {iconType === "BurgerIcon" && (
                <>
                    <BurgerIcon
                        type={
                            activeIconRoute === "/" ||
                            activeIconRoute.includes("/ingredients")
                                ? "primary"
                                : "secondary"
                        }
                    />
                    <p
                        className={
                            activeIconRoute === "/" ||
                            activeIconRoute.includes("/ingredients")
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
                            activeIconRoute === "/feed" ||
                            activeIconRoute.includes("/feed")
                                ? "primary"
                                : "secondary"
                        }
                    />
                    <p
                        className={
                            activeIconRoute === "/feed" ||
                            activeIconRoute.includes("/feed")
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
                            activeIconRoute === "/profile/orders" ||
                            activeIconRoute.includes("/profile/orders")
                                ? "primary"
                                : "secondary"
                        }
                    />
                    <p
                        className={
                            activeIconRoute === "/profile" ||
                            activeIconRoute === "/profile/orders" ||
                            activeIconRoute.includes("/profile/orders")
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
