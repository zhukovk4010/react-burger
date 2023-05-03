//Работа с API

//Импорты
import { setCookie } from "./cookie";

//Константа API
const URL_API = "https://norma.nomoreparties.space/api";

//Проверка ответа
const checkResponse = (res: Response) => {
    return res.ok
        ? res.json()
        : res.json().then((err: unknown) => Promise.reject(err));
};

//Сохранение токенов
export const saveTokens = (refreshToken: string, accessToken: string) => {
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
export const sendOrder = (data: RequestInit) => {
    return fetch(`${URL_API}/orders`, data).then(checkResponse);
};

//Запрос заказа
export const getOrderApi = (orderNumber: string, data: RequestInit) => {
    return fetch(`${URL_API}/orders/${orderNumber}`, data).then(checkResponse);
};

//Отправка email
export const sendEmail = (data: RequestInit) => {
    return fetch(`${URL_API}/password-reset`, data).then(checkResponse);
};

//Отправка нового пароля и кода, который пришел на почту
export const sendChangedPassword = (data: RequestInit) => {
    return fetch(`${URL_API}/password-reset/reset`, data).then(checkResponse);
};

//Отправка данных о пользователе при регистрации
export const sendUserRegister = (data: RequestInit) => {
    return fetch(`${URL_API}/auth/register`, data).then(checkResponse);
};

//Отправка данные о пользователе при авторизации
export const sendUserLogin = (data: RequestInit) => {
    return fetch(`${URL_API}/auth/login`, data).then(checkResponse);
};

//Выход из системы
export const userLogout = (data: RequestInit) => {
    return fetch(`${URL_API}/auth/logout`, data).then(checkResponse);
};

//Получение данные о пользователе
export const getUserRequest = async (data: RequestInit) => {
    try {
        //Получение данных
        const res = await fetch(`${URL_API}/auth/user`, data).then(
            checkResponse
        );

        return res;
    } catch (e: any) {
        if (e.message === "jwt expired") {
            //Если аксесс токен просрочен, тогда обновляем его
            const { refreshToken, accessToken } = await refreshTokenRequest();
            saveTokens(refreshToken, accessToken);
            const headersInit: HeadersInit = {};
            data.headers = headersInit;
            data.headers!.authorization = accessToken;

            //Получаем пользователя через новые данные
            const res = await fetch(`${URL_API}/auth/user`, data);
            const user = await checkResponse(res);
            return user;
        } else {
            return Promise.reject(e);
        }
    }
};
