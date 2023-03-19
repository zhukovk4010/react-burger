//Компонент кнопки в навигации

import {
    BurgerIcon,
    ProfileIcon,
    ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { TEXT_DEFAULT } from "../../../utils/constants";
import styles from "./NavigationLink.module.css";
import PropTypes from "prop-types";

const NavigationLink = (props) => {
    const location = useLocation();
    const { selectedIngredient } = useSelector((store) => ({
        selectedIngredient: store.selectedIngredient,
    }));
    const activeIconRoute = location.pathname;
    return (
        <div className={styles.button}>
            {props.iconType === "BurgerIcon" && (
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
                        {props.name}
                    </p>
                </>
            )}
            {props.iconType === "ListIcon" && (
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
                        {props.name}
                    </p>
                </>
            )}
            {props.iconType === "ProfileIcon" && (
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
                        {props.name}
                    </p>
                </>
            )}
        </div>
    );
};

NavigationLink.propTypes = {
    iconType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default NavigationLink;
