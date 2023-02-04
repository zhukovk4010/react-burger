//Компонент списка начинок
//В нем с помощью map отрисовываются данные о начинках

import PropTypes from 'prop-types';

import BurgerElement from '../burger-element/BurgerElement';

const FillingsList = props => {

    let fillingsElements = props.fillingsData.map(element => {
        return (
            <BurgerElement 
                image={element.image}
                name={element.name}
                price={element.price} 
            />
        )
    })

    return (
        <div className='mt-6 ml-4 mr-4 mb-10'>
            {fillingsElements}
        </div>
    );
}

FillingsList.propTypes = {
    bunsfillingsDataData: PropTypes.arrayOf(PropTypes.shape({
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


export default FillingsList;