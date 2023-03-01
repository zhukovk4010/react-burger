//Создание экшенов, связанных со списком ингредиентов

import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from '../../utils/constants';


export const getIngredientsAC = () => {return {type: GET_INGREDIENTS}}

export const getIngredientsFailedAC = () => {return {type: GET_INGREDIENTS_FAILED}}

export const getIngredientsSuccessAC = (data) => {
    return (
        {
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data
        }
    )
}