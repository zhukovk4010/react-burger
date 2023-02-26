//Компонент переключателей

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Tabs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../../../services/actions/tabs/setActiveTab';


const Tabs = () => {

    //Возвращаем активный переключатель из хранилища
    const {activeTab} = useSelector(store => ({
        activeTab: store.tabs.activeTab
    }))


    //Функционал перехода к нужным ингредиентам по клику еще не реализован
    return (
        <div className={styles.tabs}>         
                <Tab value="one" active={activeTab === 'one'}>
                    Булки
                </Tab> 
                <Tab value="two" active={activeTab === 'two'}>
                    Соусы
                </Tab>     
                <Tab value="three" active={activeTab === 'three'}>
                    Начинки
                </Tab>
        </div>
    );
}


export default Tabs;