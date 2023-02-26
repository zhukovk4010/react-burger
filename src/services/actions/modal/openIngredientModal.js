//AC открытия модального окна

import { OPEN_INGREDIENT_MODAL } from "../../../utils/constants";

export const openIngredientModal = () => {
    return ({
        type: OPEN_INGREDIENT_MODAL,  
    })
}