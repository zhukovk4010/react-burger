//взаимодействие с ws заказами

//Импорты
import { Middleware } from "redux";
import { AppStateType } from "../store";

//Типы
type WsActionsType = {
    wsConnect: string;
    wsConnecting: string;
    wsOpen: string;
    wsClose: string;
    wsMessage: string;
    wsError: string;
};

export const socketMiddleware = (
    wsActions: WsActionsType
): Middleware<{}, AppStateType> => {
    return (state) => {
        //Создание объекта socket
        let socket: WebSocket | null = null;
        const { wsConnect, wsConnecting, wsOpen, wsClose, wsMessage, wsError } =
            wsActions;

        return (next) => (action) => {
            const { dispatch } = state;
            const { type, payload } = action;

            //Если тип экшена WS_CONNECT, тогда создаем новый ws объект
            if (type === wsConnect) {
                dispatch({ type: wsConnecting });
                socket = new WebSocket(payload);
            }
            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: wsOpen });
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    dispatch({ type: wsMessage, payload: data });
                };

                socket.onerror = (event) => {
                    dispatch({ type: wsError, payload: event });
                };

                socket.onclose = () => {
                    dispatch({ type: wsClose });
                };
            }
            if (type === wsClose && socket) {
                socket.close();
            }

            next(action);
        };
    };
};
