//Компонент кнопки в навигации

import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './NavigationLink.module.css';


const NavigationLink = props => {
    return (
        <a className={styles.button}>
            <BurgerIcon type={props.type} />
            <h3 className={`${props.styleTextButton} ${props.inActive}`}>{props.name}</h3>
        </a>
    );
}


export default NavigationLink;