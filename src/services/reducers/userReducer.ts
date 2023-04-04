//Редюсер авторизации пользователя

//Импорты
import { SET_USER_DATA, DELETE_USER_DATA } from "../../utils/constants";
import { UserActionsTypes } from "../actions/user";

//Тип состояния
type InitialStateType = {
    name: string;
    email: string;
    isAuthenticated: boolean;
};

//Начальное состояние
const initialState: InitialStateType = {
    name: "",
    email: "",
    isAuthenticated: false,
};

const authReducer = (
    state = initialState,
    action: UserActionsTypes
): InitialStateType => {
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
