//Компонент ингридиентов бургера, в этой секции расположены переключатели и список ингридиентов

import { useState } from "react";
import { useSelector } from "react-redux";

import IngredientsList from "./ingredients-list/IngredientsList";
import Tabs from "./tabs/Tabs";

import { TEXT_LARGE } from "../../../utils/constants";

const BurgerIngredients = () => {
    const [current, setСurrent] = useState("one");

    //Возвращаем секцию ингредиентов из хранилища (ingredientsData, isLoading, hasError)
    const { ingredients } = useSelector((store: any) => ({
        ingredients: store.ingredients,
    }));

    return (
        <section>
            <h2 className={`${TEXT_LARGE} mt-10 mb-5`}>Соберите бургер</h2>
            <Tabs current={current} onClick={setСurrent} />
            {ingredients.ingredientsData ? (
                <IngredientsList setCurrent={setСurrent} />
            ) : (
                <div>
                    Произошла ошибка загрузки ингредиентов, перезагрузите
                    страницу
                </div>
            )}
        </section>
    );
};

export default BurgerIngredients;
