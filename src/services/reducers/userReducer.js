//Редюсер авторизации пользователя

import { SET_USER_DATA, DELETE_USER_DATA } from "../../utils/constants";

const initialState = {
    name: "",
    email: "",
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                name: action.name,
                email: action.email,
                isAuthenticated: true,
            };

        case DELETE_USER_DATA:
            return {
                ...state,
                name: "",
                email: "",
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
