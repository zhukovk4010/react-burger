//Компонент списка ингредиентов
//Общий список данных разделяется на 3 категории по типу
//Затем данные в зависемости от типа попадуют в нужный компонент и отрисовываются
//При клике на ингредиет выпадает модальное окно с детальным описанием

import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import BurgerElement from "./ingredient-element/IngredientElement";

import { TEXT_MEDIUM } from "../../../../utils/constants";
import styles from "./IngredientsList.module.css";

const IngredientsList = (props) => {
    //Получаем из стора секцию с ингредиентами, секцию модального окна, секцию выбранных ингредиентов, выбранный элемент
    const { ingredients, selectedIngredients } = useSelector((store) => ({
        ingredients: store.ingredients,
        selectedIngredients: store.selectedIngredients,
        selectedIngredient: store.selectedIngredient,
    }));

    //Фильтрация ингредиентов по типу
    const bunsData = useMemo(
        () => ingredients.ingredientsData.filter((ing) => ing.type === "bun"),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ingredients.ingredientsData, selectedIngredients]
    );
    const saucesData = useMemo(
        () => ingredients.ingredientsData.filter((ing) => ing.type === "sauce"),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ingredients.ingredientsData, selectedIngredients]
    );
    const fillingsData = useMemo(
        () => ingredients.ingredientsData.filter((ing) => ing.type === "main"),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ingredients.ingredientsData, selectedIngredients]
    );

    useEffect(() => {
        //Реализация переключения табов из-за скролла пользователя

        //Выбираем все хедеры
        const sections = document.querySelectorAll(".header");

        // Хедер должен быть полностью виден на экране
        const options = {
            threshold: "1",
        };

        //Заглушка для хедера с соусами, так как она при рендере возваращает true и tab переключается на соусы
        let plugSauce = false;

        //Переключение табов при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                //Если хедер bunsSection виден полностью, то его переключатель становится активным
                if (e.isIntersecting && e.target.id === "bunsSection") {
                    props.setCurrent("one");
                    //Если хедер sauceSection виден полность и заглушка включена, то его переключатель становится активным
                } else if (
                    e.isIntersecting &&
                    e.target.id === "sauceSection" &&
                    plugSauce
                ) {
                    props.setCurrent("two");
                    //Если хедер bunsSection пропадает из видимости, происходит переключение на соусы, так как они под ними
                } else if (!e.isIntersecting && e.target.id === "bunsSection") {
                    props.setCurrent("two");
                    //Если хедер sauceSection пропадается из видимости, то активным переключателем становятся Начинки
                    //В этом случае активируем заглушку для соусов, чтобы при обратном скролле можно было переключится на них
                } else if (
                    !e.isIntersecting &&
                    e.target.id === "sauceSection"
                ) {
                    props.setCurrent("three");
                    plugSauce = true;
                }
            });
        }, options);
        sections.forEach((section) => {
            observer.observe(section);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section id="srollList" className={`mt-10 ${styles.ingredients}`}>
            <h3 id="bunsSection" className={`header ${TEXT_MEDIUM}`}>
                Булки
            </h3>
            {bunsData.map((ingredient) => {
                return (
                    <BurgerElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                );
            })}

            <h3 id="sauceSection" className={`header ${TEXT_MEDIUM}`}>
                Соусы
            </h3>
            {saucesData.map((ingredient) => {
                return (
                    <BurgerElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                );
            })}

            <h3 id="mainSection" className={`header ${TEXT_MEDIUM}`}>
                Начинки
            </h3>
            {fillingsData.map((ingredient) => {
                return (
                    <BurgerElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                );
            })}
        </section>
    );
};

IngredientsList.propTypes = {
    setCurrent: PropTypes.func.isRequired,
};

export default IngredientsList;
