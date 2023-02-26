//Компонент переключателей

import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Tabs.module.css';


const Tabs = props => {

    //Функционал перехода к нужным ингредиентам по клику еще не реализован
    return (
        <div className={styles.tabs}>         
                <Tab value="one" active={props.current === 'one'}>
                    Булки
                </Tab> 
                <Tab value="two" active={props.current === 'two'}>
                    Соусы
                </Tab>     
                <Tab value="three" active={props.current === 'three'}>
                    Начинки
                </Tab>
        </div>
    );
}

Tabs.propTypes = {
    current: PropTypes.string.isRequired
}


export default Tabs;