//Компонент списка ингредиентов
//Общий список данных разделяется на 3 категории по типу
//Затем данные в зависемости от типа попадуют в нужный компонент и отрисовываются
//При клике на ингредиет выпадает модальное окно с детальным описанием

//Импорты
import { useEffect, useMemo } from "react";

import { IngredientType } from "../../../../types/types";

import IngredientElement from "./ingredient-element/IngredientElement";

import { TEXT_MEDIUM } from "../../../../utils/constants";
import styles from "./IngredientsList.module.css";
import { useAppSelector } from "../../../../hooks/hooks";

//Типы
type IngredientsListType = {
    setCurrent: React.Dispatch<React.SetStateAction<string>>;
};

const IngredientsList = ({ setCurrent }: IngredientsListType) => {
    //Получаем из стора секцию с ингредиентами, секцию модального окна, секцию выбранных ингредиентов, выбранный элемент
    const { ingredients } = useAppSelector((state) => ({
        ingredients: state.ingredients,
    }));

    //Фильтрация ингредиентов по типу
    const bunsData = useMemo(
        () =>
            ingredients.ingredientsData.filter(
                (ing: IngredientType) => ing.type === "bun"
            ),
        [ingredients.ingredientsData]
    );
    const saucesData = useMemo(
        () =>
            ingredients.ingredientsData.filter(
                (ing: IngredientType) => ing.type === "sauce"
            ),
        [ingredients.ingredientsData]
    );
    const fillingsData = useMemo(
        () =>
            ingredients.ingredientsData.filter(
                (ing: IngredientType) => ing.type === "main"
            ),
        [ingredients.ingredientsData]
    );

    useEffect(() => {
        //Реализация переключения табов из-за скролла пользователя

        //Выбираем все хедеры
        const sections = document.querySelectorAll(".header");

        type optionsType = {
            threshold: number;
        };

        // Хедер должен быть полностью виден на экране
        const options: optionsType = {
            threshold: 1,
        };

        //Заглушка для хедера с соусами, так как она при рендере возваращает true и tab переключается на соусы
        let plugSauce = false;

        //Переключение табов при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                //Если хедер bunsSection виден полностью, то его переключатель становится активным
                if (e.isIntersecting && e.target.id === "bunsSection") {
                    setCurrent("one");
                    //Если хедер sauceSection виден полность и заглушка включена, то его переключатель становится активным
                } else if (
                    e.isIntersecting &&
                    e.target.id === "sauceSection" &&
                    plugSauce
                ) {
                    setCurrent("two");
                    //Если хедер bunsSection пропадает из видимости, происходит переключение на соусы, так как они под ними
                } else if (!e.isIntersecting && e.target.id === "bunsSection") {
                    setCurrent("two");
                    //Если хедер sauceSection пропадается из видимости, то активным переключателем становятся Начинки
                    //В этом случае активируем заглушку для соусов, чтобы при обратном скролле можно было переключится на них
                } else if (
                    !e.isIntersecting &&
                    e.target.id === "sauceSection"
                ) {
                    setCurrent("three");
                    plugSauce = true;
                }
            });
        }, options);
        sections.forEach((section) => {
            observer.observe(section);
        });
    }, [setCurrent]);

    return (
        <section id="srollList" className={`mt-10 ${styles.ingredients}`}>
            <h3 id="bunsSection" className={`header ${TEXT_MEDIUM}`}>
                Булки
            </h3>
            {bunsData.map((ingredient: IngredientType) => {
                return (
                    <IngredientElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                );
            })}

            <h3 id="sauceSection" className={`header ${TEXT_MEDIUM}`}>
                Соусы
            </h3>
            {saucesData.map((ingredient: IngredientType) => {
                return (
                    <IngredientElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                );
            })}

            <h3 id="mainSection" className={`header ${TEXT_MEDIUM}`}>
                Начинки
            </h3>
            {fillingsData.map((ingredient: IngredientType) => {
                return (
                    <IngredientElement
                        key={ingredient._id}
                        ingredient={ingredient}
                    />
                );
            })}
        </section>
    );
};

export default IngredientsList;
