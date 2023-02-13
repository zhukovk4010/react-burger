//Компонент ингридиентов бургера, в этой секции расположены переключатели и список ингридиентов

import PropTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';

import IngredientsList from './ingredients-list/IngredientsList';
import Tabs from './tabs/Tabs';

import { TEXT_LARGE } from '../../../utils/fontsStyles';


const BurgerIngredients = props => {
    return (
        <section>
            <h2 className={`${TEXT_LARGE} mt-10 mb-5`}>Соберите бургер</h2>
            <Tabs />
            <IngredientsList ingredientsData={props.ingredientsData} />
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredientsData: PropTypes.arrayOf(ingredientType).isRequired
}


export default BurgerIngredients;