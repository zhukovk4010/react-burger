//Компонент "Навигации", где можно переключатся между конструктором бургеров и лентой заказов

import NavigationLink from './navigation-link/NavigationLink';

import { TEXT_DEFAULT, TEXT_INACTIVE_COLOR } from '../../../utils/fontsStyles';
import styles from './Navigation.module.css';


const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <NavigationLink 
                styleTextButton={TEXT_DEFAULT}
                type={'primary'} 
                name={'Конструктор'} 
            />
            <NavigationLink 
                styleTextButton={TEXT_DEFAULT} 
                inActive={TEXT_INACTIVE_COLOR} 
                type={'secondary'} 
                name={'Лента заказов'} 
            />
        </nav>
    );
}


export default Navigation;