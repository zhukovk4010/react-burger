//Компонент списка ингредиентов 
//Общий список данных разделяется на 3 категории по типу
//Затем данные в зависемости от типа попадуют в нужный компонент и отрисовываются

import PropTypes from 'prop-types';

import BunsList from './buns-list/BunsList';
import FillingsList from './fillings-list/FillingsList';
import SaucesList from './sauces-list/SaucesList';

import styles from './IngredientsList.module.css';


const IngredientsList = props => {

    let bunsData = [];
    let saucesData = [];
    let fillingsData = [];


    //Разделение ингредиентов по типу

    for (let i = 0; i < props.data.length; i++) {

        if (props.data[i].type === 'bun') {
            bunsData.push(props.data[i]);
        } else if (props.data[i].type === 'sauce') {
            saucesData.push(props.data[i]);
        } else {
            fillingsData.push(props.data[i])
        }

    }

    return (
        <section className={`mt-10 ${styles.ingredients}`}>
            <h3 className='text text_type_main-medium'>Булки</h3>
            <BunsList key={bunsData.id} bunsData={bunsData} />
            <h3 className='text text_type_main-medium'>Соусы</h3>
            <SaucesList saucesData={saucesData} />
            <h3 className='text text_type_main-medium'>Начинки</h3>
            <FillingsList fillingsData={fillingsData} />
        </section>
    );
}

IngredientsList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
    })).isRequired
}


export default IngredientsList;