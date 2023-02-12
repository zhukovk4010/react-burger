//Компонент "Навигационная панель", внутри нее навигация, логотип и переход в личный кабинет

import Navigation from './navigation/Navigation';
import PersonalAreaNavigationLink from './personal-area-navigation-link/PersonalAreaNavigationLink';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';


const AppHeader = () => {
    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <Navigation />
                <div className={styles.logoContainer}>
                    <Logo />
                </div>
                <PersonalAreaNavigationLink />
            </header>
        </div>
    );
}


export default AppHeader;