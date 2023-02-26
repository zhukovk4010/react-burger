//Компонент списка ингредиентов 
//Общий список данных разделяется на 3 категории по типу
//Затем данные в зависемости от типа попадуют в нужный компонент и отрисовываются
//При клике на ингредиет выпадает модальное окно с детальным описанием

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveTab } from '../../../../services/actions/tabs/setActiveTab';
import { closeModalActionCreator } from '../../../../services/actions/modal/closeIngredientModal';

import Modal from '../../../modals/Modal';
import IngredientDetails from './ingredient-details/IngredientDetails';
import BurgerElement from './ingredient-element/IngredientElement';

import { TEXT_MEDIUM } from '../../../../utils/constants';
import styles from './IngredientsList.module.css';
import { deleteSelectedIngredient } from '../../../../services/actions/selectedIngredient/deleteSelectedIngredient';


const IngredientsList = () => {

    //Получаем из стора секцию с ингредиентами, секцию модального окна, секцию выбранных ингредиентов, выбранный элемент
    const { ingredients, selectedIngredients, selectedIngredient, modal } = useSelector(store => ({
        ingredients: store.ingredients,
        selectedIngredients: store.selectedIngredients,
        selectedIngredient: store.selectedIngredient,
        modal: store.modal
    }))

    const dispatch = useDispatch();

    //Фильтрация ингредиентов по типу
    const bunsData = useMemo(() => ingredients.ingredientsData.filter(ing => ing.type === 'bun'), [ingredients.ingredientsData, selectedIngredients]);
    const saucesData = useMemo(() => ingredients.ingredientsData.filter(ing => ing.type === 'sauce'), [ingredients.ingredientsData, selectedIngredients]);
    const fillingsData = useMemo(() => ingredients.ingredientsData.filter(ing => ing.type === 'main'), [ingredients.ingredientsData, selectedIngredients]);


    //Функция закрытия модального окна, отправляет в диспатч 2 экшена (закрытие модального окна и удаление выбранного элемента)
    //Передается в компонент Modal
    const closeModal = () => {
        dispatch(closeModalActionCreator());
        dispatch(deleteSelectedIngredient())
    }


    //Если в хранилище поменялось состояния openIngredientsDetailsModal на true, то отрисовывается модальное окно
    //В него передается title и функция закрытия модального окна
    //В Children передаем компонент IngredientDetails, который содержит выбранный элемент из хранилища
    const modalContainer = (
        <>
            {modal.openIngredientsDetailsModal && (<Modal onClose={() => closeModal()} title='Детали ингредиента'>
                <IngredientDetails ingredient={selectedIngredient} />
            </Modal>)}
        </>
    )

    useEffect(() => {

        //Реализация переключения табов из-за скролла пользователя

        //Выбираем все хедеры
        const sections = document.querySelectorAll('.header')

        // Хедер должен быть полностью виден на экране
        const options = {
            threshold: '1'
        };

        //Заглушка для хедера с соусами, так как она при рендере возваращает true и tab переключается на соусы
        let plugSauce = false;


        //Переключение табов при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                //Если хедер bunsSection виден полностью, то его переключатель становится активным
                if (e.isIntersecting && e.target.id === 'bunsSection') {
                    dispatch(setActiveTab('one'))
                    //Если хедер sauceSection виден полность и заглушка включена, то его переключатель становится активным
                } else if ((e.isIntersecting && e.target.id === 'sauceSection') && plugSauce) {
                    dispatch(setActiveTab('two'))
                    //Если хедер bunsSection пропадает из видимости, происходит переключение на соусы, так как они под ними
                } else if (!e.isIntersecting && e.target.id === 'bunsSection') {
                    dispatch(setActiveTab('two'))
                    //Если хедер sauceSection пропадается из видимости, то активным переключателем становятся Начинки
                    //В этом случае активируем заглушку для соусов, чтобы при обратном скролле можно было переключится на них
                } else if (!e.isIntersecting && e.target.id === 'sauceSection') {
                    dispatch(setActiveTab('three'));
                    plugSauce = true;
                }
            });
        }, options);
        sections.forEach((section) => {
            observer.observe(section)
        })
    }, [])


    return (
        <section id='srollList' className={`mt-10 ${styles.ingredients}`}>

            <h3 id='bunsSection' className={`header ${TEXT_MEDIUM}`}>Булки</h3>
            {bunsData.map((ingredient) => {
                return (
                    <BurgerElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                )
            })}

            <h3 id='sauceSection' className={`header ${TEXT_MEDIUM}`}>Соусы</h3>
            {saucesData.map((ingredient) => {
                return (
                    <BurgerElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                )
            })}

            <h3 id='mainSection' className={`header ${TEXT_MEDIUM}`}>Начинки</h3>
            {fillingsData.map((ingredient) => {
                return (
                    <BurgerElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                )
            })}
            {modalContainer}
        </section>
    );
}


export default IngredientsList;