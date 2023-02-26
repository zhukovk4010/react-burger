//Компонент ингридиентов бургера, в этой секции расположены переключатели и список ингридиентов

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIngredients } from '../../../services/thunk/getIngredientsThunk';

import IngredientsList from './ingredients-list/IngredientsList';
import Tabs from './tabs/Tabs';

import { TEXT_LARGE } from '../../../utils/constants';


const BurgerIngredients = () => {

    const [current, setСurrent] = useState('one')

    //Возвращаем секцию ингредиентов из хранилища (ingredientsData, isLoading, hasError)
    const {ingredients} = useSelector(store => ({
        ingredients: store.ingredients
    }))

    const dispatch = useDispatch();

    //Загрузка ингредиентов 
    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    return (
        <section>
            <h2 className={`${TEXT_LARGE} mt-10 mb-5`}>Соберите бургер</h2>
            <Tabs current={current} />
            {ingredients.ingredientsData ? <IngredientsList setCurrent={setСurrent} /> : <div>Произошла ошибка загрузки ингредиентов, перезагрузите страницу</div>}     
        </section>
    );
}


export default BurgerIngredients;