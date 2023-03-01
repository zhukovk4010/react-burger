//Reducer списка ингредиетов

import {GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED} from '../../utils/constants';

const initialState = {
    ingredientsData: [],
    isLoading: false,
    hasError: false
}


const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {

        //При обращению к API
        case GET_INGREDIENTS:
            return {...state,
				isLoading: true,
				hasError: false
            };

        //При успешном получение данных из API
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsData: action.ingredients,
                isLoading: false,
                hasError: false
            };
        //При возникновении ошибки
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        default:
            return state;
    }
}


export default ingredientsReducer;