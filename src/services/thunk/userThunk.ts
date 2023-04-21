//Функция запроса пользователя при авторизации

//Импорты
import {
    getUserRequest,
    sendEmail,
    sendUserLogin,
    sendChangedPassword,
    sendUserRegister,
    userLogout,
    saveTokens,
} from "../../utils/burgerApi";
import { setUserDataAction } from "../actions/user";
import { getCookie, setCookie } from "../../utils/cookie";
import { deleteUserDataAction } from "../actions/user";
import { AppDispatchThunk, AppThunk } from "../../types/types";

//Запрос пользователя
export const getUser: AppThunk = () => {
    return async (dispatch: AppDispatchThunk) => {
        try {
            let user = await getUserRequest({
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    authorization: "Bearer " + getCookie("accessToken"),
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            dispatch(setUserDataAction(user.user.email, user.user.name));
        } catch (e: unknown) {}
    };
};

//Отправка email, для получения кода
export const sendPasswordOnEmail: AppThunk = (email: string) => {
    return async (dispatch: AppDispatchThunk) => {
        try {
            const res = await sendEmail({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ email: email }),
            });
            return res.success;
        } catch (e: unknown) {
            if (e instanceof Error) {
                //Показываем ошибку
                window.alert(e.message);
            }
        }
    };
};

//Отправка данных для авторизации
export const sendLoginData: AppThunk = (email: string, password: string) => {
    return async (dispatch: AppDispatchThunk) => {
        try {
            const res = await sendUserLogin({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(setUserDataAction(res.user.email, res.user.name));
            return res.success;
        } catch (e: unknown) {
            if (e instanceof Error) {
                //Показываем пользователю ошибку
                window.alert(e.message);
            }
        }
    };
};

//Изменение пароля
export const resetPassword: AppThunk = (newPassword: string, code: string) => {
    return async (dispatch: AppDispatchThunk) => {
        try {
            const res = await sendChangedPassword({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    password: newPassword,
                    token: code,
                }),
            });
            return res.success;
        } catch (e: unknown) {
            if (e instanceof Error) {
                //Показываем ошибку
                window.alert(e.message);
            }
        }
    };
};

//Регистрация
export const registerUser: AppThunk = (
    name: string,
    email: string,
    password: string
) => {
    return async (dispatch: AppDispatchThunk) => {
        try {
            const res = await sendUserRegister({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                }),
            });
            saveTokens(res.refreshToken, res.accessToken);
            dispatch(setUserDataAction(res.user.email, res.user.name));
            return res.success;
        } catch (e: unknown) {
            if (e instanceof Error) {
                //Показываем пользователю ошибку
                window.alert(e.message);
            }
        }
    };
};

//Сохрание изменных данных о пользователе на странице профиля
export const saveNewUserData: AppThunk = (
    name: string,
    email: string,
    password: string
) => {
    let newPassword: string;
    if (password) {
        newPassword = password;
    }
    return async (dispatch: AppDispatchThunk) => {
        try {
            const res = await getUserRequest({
                method: "PATCH",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    authorization: "Bearer " + getCookie("accessToken"),
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: newPassword,
                }),
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            dispatch(setUserDataAction(res.user.email, res.user.name));
        } catch (e: unknown) {
            if (e instanceof Error) {
                window.alert(e.message);
            }
        }
    };
};

//Выход пользователя из аккаунта
export const exitUser: AppThunk = () => {
    return async (dispatch: AppDispatchThunk) => {
        try {
            const res = await userLogout({
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    token: localStorage.getItem("refreshToken"),
                }),
            });

            dispatch(deleteUserDataAction());
            setCookie("accessToken", null, { expires: -1 });
            localStorage.setItem("refreshToken", "");
            return res.success;
        } catch (e: unknown) {
            if (e instanceof Error) {
                window.alert(e.message);
            }
        }
    };
};
