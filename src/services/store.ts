//Инициализация store

import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";
import { socketMiddleware } from "./middleware/ordersMiddleware";
import {
    WS_CLOSE,
    WS_CONNECT,
    WS_CONNECTING,
    WS_ERROR,
    WS_MESSAGE,
    WS_OPEN,
} from "./actions/actionsTypes";

//Активируем ReduxDevTools

const composeEnhancers =
    // @ts-ignore
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? // @ts-ignore
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const ordersActions = {
    wsConnect: WS_CONNECT,
    wsConnecting: WS_CONNECTING,
    wsOpen: WS_OPEN,
    wsClose: WS_CLOSE,
    wsMessage: WS_MESSAGE,
    wsError: WS_ERROR,
};

const enhancer = composeEnhancers(
    applyMiddleware(thunk, socketMiddleware(ordersActions))
);

const store = createStore(rootReducer, enhancer);

export type AppStateType = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;

export default store;
