//Создание экшенов, связанных с модальным окном

import {
    OPEN_ORDER_MODAL,
    OPEN_INGREDIENT_MODAL,
    CLOSE_ORDER_MODAL,
    CLOSE_INGREDIENT_MODAL,
} from "../../utils/constants";

export const openOrderModalAC = () => {
    return {
        type: OPEN_ORDER_MODAL,
    };
};

export const openIngredientModalAC = () => {
    return {
        type: OPEN_INGREDIENT_MODAL,
    };
};

export const closeOrderModalAC = () => {
    return {
        type: CLOSE_ORDER_MODAL,
    };
};

export const closeIngredientModalAC = () => {
    return {
        type: CLOSE_INGREDIENT_MODAL,
    };
};
