//Компонент списка ингредиентов 
//Общий список данных разделяется на 3 категории по типу
//Затем данные в зависемости от типа попадуют в нужный компонент и отрисовываются
//При клике на ингредиет выпадает модальное окно с детальным описанием

import { useState } from 'react';

import PropTypes from 'prop-types';
import { ingredientType } from '../../../../utils/types';

import Modal from '../../../modals/Modal';
import IngredientDetails from './ingredient-details/IngredientDetails';
import BurgerElement from './ingredient-element/IngredientElement';

import { TEXT_MEDIUM } from '../../../../utils/fontsStyles';
import styles from './IngredientsList.module.css';


const IngredientsList = props => {

    const bunsData = [];
    const saucesData = [];
    const fillingsData = [];

    const [openModal, setOpenModal] = useState(false);

    //Информация о выбранном ингредиенте, которая уходит в пропсы компоненту IngredientDetails
    const [selectedElementInfo, setSecletedElementInfo] = useState();

    //При openModal == true, отрисовывается содержимое переменной
    //Передаем в модальное окно функцию onClose, которая будет закрывать модальное окно
    const modal = (
        <>
            {openModal && (<Modal onClose={() => setOpenModal(false)} title='Детали ингредиента'>
                <IngredientDetails element={selectedElementInfo} />
            </Modal>)}
        </>

    )

    //Функция которая передается через пропс в каждый элемент. По нажатию на элемент данные из API выбарнного элемента
    //помещаются в переменную selectedElementInfo, а openModal изменяется на true и происходит отрисовка модального окна
    const openSelectedElementModal = (selectedElement) => {
        setSecletedElementInfo(selectedElement);
        setOpenModal(true);
    }


    //Разделение ингредиентов по типу
    for (let i = 0; i < props.ingredientsData.length; i++) {

        if (props.ingredientsData[i].type === 'bun') {
            bunsData.push(props.ingredientsData[i]);
        } else if (props.ingredientsData[i].type === 'sauce') {
            saucesData.push(props.ingredientsData[i]);
        } else {
            fillingsData.push(props.ingredientsData[i])
        }

    }

    return (
        <section className={`mt-10 ${styles.ingredients}`}>
            <h3 className={TEXT_MEDIUM}>Булки</h3>
            {bunsData.map((element) => {
                return (
                    <BurgerElement key={element._id} element={element} openModal={openSelectedElementModal} />
                )
            })}
            <h3 className={TEXT_MEDIUM}>Соусы</h3>
            {saucesData.map((element) => {
                return (
                    <BurgerElement key={element._id} element={element} openModal={openSelectedElementModal} />
                )
            })}
            <h3 className={TEXT_MEDIUM}>Начинки</h3>
            {fillingsData.map((element) => {
                return (
                    <BurgerElement key={element._id} element={element} openModal={openSelectedElementModal} />
                )
            })}
            {modal}
        </section>
    );
}

//Проверка данных приходящих из API
IngredientsList.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
}


export default IngredientsList;