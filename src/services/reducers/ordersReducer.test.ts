import { wsClose, wsConnecting, wsMessage, wsOpen } from "../actions/orders";
import wsOrdersReducer, { InitialStateType } from "./ordersReducer";

const state: InitialStateType = {
    wsStatus: "OFFLINE",
    orders: [],
    totalOrders: 0,
    totalTodayOrders: 0,
    error: undefined,
};

describe("test orders reducer", () => {
    it("ws connecting action", () => {
        const action = wsConnecting();
        const newState = wsOrdersReducer(state, action);

        expect(newState).toEqual({
            ...state,
            wsStatus: "CONNECTING",
        });
    });
    it("ws open action", () => {
        const action = wsOpen();
        const newState = wsOrdersReducer(state, action);

        expect(newState).toEqual({
            ...state,
            wsStatus: "ONLINE",
        });
    });
    it("ws message action", () => {
        const action = wsMessage({
            success: true,
            orders: ["Заказ 1", "Заказ 2"],
            total: 10,
            totalToday: 5,
        });
        const newState = wsOrdersReducer(state, action);

        expect(newState).toEqual({
            ...state,
            orders: ["Заказ 1", "Заказ 2"],
            totalOrders: 10,
            totalTodayOrders: 5,
        });
    });
    it("ws close action", () => {
        const action = wsClose();
        const newState = wsOrdersReducer(state, action);

        expect(newState).toEqual({
            ...state,
        });
    });
});
