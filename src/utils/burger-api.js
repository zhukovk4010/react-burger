//Работа с API

import { setCookie } from "./cookie";

const URL_API = "https://norma.nomoreparties.space/api";

//Проверка ответа
const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

//Сохранение токенов
export const saveTokens = (refreshToken, accessToken) => {
    setCookie("accessToken", accessToken.split("Bearer ")[1]);
    localStorage.setItem("refreshToken", refreshToken);
};

//Запрос через рефреш токен
export const refreshTokenRequest = () => {
    return fetch(`${URL_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

//Запрос ингредиентов
export const getIngredientsData = () => {
    return fetch(`${URL_API}/ingredients`).then(checkResponse);
};

//Отправка заказа
export const sendOrder = (data) => {
    return fetch(`${URL_API}/orders`, data).then(checkResponse);
};

//Отправка email
export const sendEmail = (data) => {
    return fetch(`${URL_API}/password-reset`, data).then(checkResponse);
};

//Отправка нового пароля и кода, который пришел на почту
export const sendChangedPassword = (data) => {
    return fetch(`${URL_API}/password-reset`, data).then(checkResponse);
};

//Отправка данных о пользователе при регистрации
export const sendUserRegister = (data) => {
    return fetch(`${URL_API}/auth/register`, data).then(checkResponse);
};

//Отправка данные о пользователе при авторизации
export const sendUserLogin = (data) => {
    return fetch(`${URL_API}/auth/login`, data).then(checkResponse);
};

//Выход из системы
export const userLogout = (data) => {
    return fetch(`${URL_API}/auth/logout`, data).then(checkResponse);
};

//Получение данные о пользователе
export const getUserRequest = async (data) => {
    try {
        //Получение данных
        const res = await fetch(`${URL_API}/auth/user`, data);
        const user = await checkResponse(res);
        return user;
    } catch (e) {
        //Если аксесс токен просрочен, тогда обновляем его
        if (e.message === "jwt expired") {
            const { refreshToken, accessToken } = await refreshTokenRequest();
            saveTokens(refreshToken, accessToken);

            data.headers.authorization = accessToken;

            //Получаем пользователя через новые данные
            const res = await fetch(`${URL_API}/auth/user`, data);
            const user = await checkResponse(res);
            return user;
        } else {
            return Promise.reject(e);
        }
    }
};
