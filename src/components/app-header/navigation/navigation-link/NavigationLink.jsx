//Компонент кнопки в навигации

import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './NavigationLink.module.css';


const NavigationLink = props => {
    return (
        <div className={styles.button}>
            <BurgerIcon type={props.type} />
            <h3 className={`${props.styleTextButton} ${props.inActive}`}>{props.name}</h3>
        </div>
    );
}


export default NavigationLink;