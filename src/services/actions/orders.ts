//Экшены для ленты заказов (общей и пользователя)

//Импорты
import {
    WS_CLOSE,
    WS_CONNECT,
    WS_CONNECTING,
    WS_ERROR,
    WS_MESSAGE,
    WS_OPEN,
} from "./actionsTypes";

//Типы
type WsConnectType = {
    type: typeof WS_CONNECT;
    payload: string;
};

type WsConnectingType = {
    type: typeof WS_CONNECTING;
};

type WsOpenType = {
    type: typeof WS_OPEN;
};

type WsCloseType = {
    type: typeof WS_CLOSE;
};

type WsMessageType = {
    type: typeof WS_MESSAGE;
    payload: any;
};

type WsErrorType = {
    type: typeof WS_ERROR;
    payload: Event;
};

export type OrdersTypes =
    | WsConnectType
    | WsConnectingType
    | WsOpenType
    | WsCloseType
    | WsMessageType
    | WsErrorType;

//Подключение к серверу
export const wsConnect = (url: string): WsConnectType => ({
    type: WS_CONNECT,
    payload: url,
});

//Статус загрузки
export const wsConnecting = (): WsConnectingType => ({ type: WS_CONNECTING });

//Соединение открыто
export const wsOpen = (): WsOpenType => ({ type: WS_OPEN });

//Соединение закрыто
export const wsClose = (): WsCloseType => ({ type: WS_CLOSE });

//Получение сообщения с сервера
export const wsMessage = (payload: any): WsMessageType => ({
    type: WS_MESSAGE,
    payload: payload,
});

//Получение ошибки
export const wsError = (payload: Event): WsErrorType => ({
    type: WS_ERROR,
    payload: payload,
});
