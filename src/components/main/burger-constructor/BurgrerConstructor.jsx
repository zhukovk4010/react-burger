//Компонента конструктора бургеров
//В ней содержится список выбранных ингредиентов и итоговая информацияы

import PropTypes from 'prop-types';

import Information from "./information/Information";
import SelectedIngredientsList from "./selected-ingredients-list/SelectedIngredientsList";


const BurgerConstructor = props => {
    return (
        <section className='mt-25'>
            <SelectedIngredientsList data={props.data} />
            <Information />
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.array.isRequired
};


export default BurgerConstructor;