//Компонент ингридиентов бургера, в этой секции расположены переключатели и список ингридиентов

import PropTypes from 'prop-types';

import IngredientsList from './ingredients-list/IngredientsList';
import Tabs from './tabs/Tabs';


const BurgerIngredients = props => {
    return (
        <section>
            <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
            <Tabs />
            <IngredientsList data={props.data} />
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired
}


export default BurgerIngredients;