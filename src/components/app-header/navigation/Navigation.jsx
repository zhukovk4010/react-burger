//Компонент "Навигации", где можно переключатся между конструктором бургеров и лентой заказов

import BurgerConstructorNavigationLink from './burger-contructor-navigation-link/BurgerConstructorNavigationLink';
import OrderFeedNavigationLink from './order-feed-navigation-link/OrderFeedNavigationLink';

import styles from './Navigation.module.css';


const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <BurgerConstructorNavigationLink />
            <OrderFeedNavigationLink />
        </nav>
    );
}


export default Navigation;