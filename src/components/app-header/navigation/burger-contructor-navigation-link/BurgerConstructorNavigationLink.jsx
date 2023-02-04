//Компонент кнопки переключения на меню создания бургеров

import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './BurgerConstructorNavigationLink.module.css';


const BurgerConstructorNavigationLink = () => {
    return (
        <a className={`pl-5 pr-5 pb-4 pt-4 ${styles.button}`}>
            <BurgerIcon type='primary' />
            <h3 className='text text_type_main-default'>Конструктор</h3>
        </a>
    );
}


export default BurgerConstructorNavigationLink;