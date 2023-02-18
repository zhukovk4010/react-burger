//Компонента конструктора бургеров
//В ней содержится список выбранных ингредиентов и итоговая информацияы

import Information from "./information/Information";
import SelectedIngredientsList from "./selected-ingredients-list/SelectedIngredientsList";


const BurgerConstructor = () => {
    return (
        <section className='mt-25'>
            <SelectedIngredientsList />
            <Information />
        </section>
    );
}


export default BurgerConstructor;