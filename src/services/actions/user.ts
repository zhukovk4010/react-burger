//Создание экшинов, связанных с пользователем

//Импорты
import { DELETE_USER_DATA, SET_USER_DATA } from "./actionsTypes";

//Типы экшенов
type SetUserDataActionType = {
    type: typeof SET_USER_DATA;
    name: string;
    email: string;
};

type DeleteUserDataActionType = {
    type: typeof DELETE_USER_DATA;
};

export type UserActionsTypes = SetUserDataActionType | DeleteUserDataActionType;

//Экшены

//Экшен изменения данных пользователя
export const setUserDataAction = (
    email: string,
    name: string
): SetUserDataActionType => ({
    type: SET_USER_DATA,
    name: name,
    email: email,
});

//Экшен удаления данных о пользователе
export const deleteUserDataAction = (): DeleteUserDataActionType => ({
    type: DELETE_USER_DATA,
});
