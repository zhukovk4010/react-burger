//Компонент кнопки перехода в личный кабинет

import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './PersonalAreaNavigationLink.module.css';


const PersonalAreaNavigationLink = props => {
    return (
        <a className={`pl-5 pr-5 pb-4 pt-4 ${styles.button}`}>
            <ProfileIcon type='secondary' />
            <h3 className='text text_type_main-default colorInActive'>Личный кабинет</h3>
    </a>
    );
}


export default PersonalAreaNavigationLink;