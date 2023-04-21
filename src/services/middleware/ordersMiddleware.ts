//взаимодействие с ws заказами

import { AppStateType } from "../store";
import { AppDispatch } from "../../types/types";
import {
    wsClose,
    wsConnecting,
    wsError,
    wsMessage,
    wsOpen,
} from "../actions/orders";
import { Middleware, MiddlewareAPI } from "redux";

type WsActionsType = {
    wsConnect: string;
    wsConnecting: string;
    wsOpen: string;
    wsClose: string;
    wsMessage: string;
    wsError: string;
};

export const socketMiddleware = (wsActions: WsActionsType): Middleware => {
    return (state: MiddlewareAPI<AppDispatch, AppStateType>) => {
        //Создание объекта socket
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const { dispatch } = state;
            const { type, payload } = action;
            //Если тип экшена WS_CONNECT, тогда создаем новый ws объект
            if (type === "WS_CONNECT") {
                dispatch(wsConnecting());
                socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch(wsOpen());
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    dispatch(wsMessage(data));
                };

                socket.onerror = (event) => {
                    dispatch(wsError(event));
                };

                socket.onclose = () => {
                    dispatch(wsClose);
                };
            }
            if (type === "WS_CLOSE" && socket) {
                socket.close();
            }

            next(action);
        };
    };
};
