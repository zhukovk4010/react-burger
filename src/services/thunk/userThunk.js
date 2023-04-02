//Функция запроса пользователя при авторизации

//Импорты
import {
    getUserRequest,
    sendEmail,
    sendUserLogin,
    sendChangedPassword,
    sendUserRegister,
    userLogout,
} from "../../utils/burgerApi";
import { setUserDataAction } from "../actions/user";
import { getCookie } from "../../utils/cookie";

export const getUser = () => {
    return async (dispatch) => {
        try {
            const user = await getUserRequest({
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
        } catch (e) {
            return null;
        }
    };
};

//Отправка email, для получения кода
export const sendPasswordOnEmail = async (email) => {
    try {
        const data = await sendEmail({
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ email: email }),
        });
        return data;
    } catch (e) {
        if (e) {
            //Показываем ошибку
            window.alert(e.message);
        }
    }
};

//Отправка данных для авторизации
export const sendLoginData = async (email, password) => {
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
        return res;
    } catch (e) {
        //Показываем пользователю ошибку
        window.alert(e.message);
    }
};

//Изменение пароля
export const resetPassword = async (newPassword, code) => {
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
        return res;
    } catch (e) {
        //Показываем ошибку
        window.alert(e.message);
    }
};

//Регистрация

export const registerUser = async (name, email, password) => {
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
        return res;
    } catch (e) {
        //Показываем пользователю ошибку
        window.alert(e.message);
    }
};

export const saveNewUserData = async (name, email, password) => {
    let newPassword;
    if (password) {
        newPassword = password;
    }
    try {
        const user = await getUserRequest({
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
        return user;
    } catch (e) {
        window.alert(e.message);
    }
};

//Выход пользователя из аккаунта

export const exitUser = async () => {
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
        return res;
    } catch (e) {
        window.alert(e.message);
    }
};
