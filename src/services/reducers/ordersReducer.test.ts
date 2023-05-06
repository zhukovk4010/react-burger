import { wsClose, wsConnecting, wsMessage, wsOpen } from "../actions/orders";
import wsOrdersReducer, { initialState } from "./ordersReducer";

describe("test orders reducer", () => {
    it("ws connecting action", () => {
        const action = wsConnecting();
        const newState = wsOrdersReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            wsStatus: "CONNECTING",
        });
    });
    it("ws open action", () => {
        const action = wsOpen();
        const newState = wsOrdersReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
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
        const newState = wsOrdersReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            orders: ["Заказ 1", "Заказ 2"],
            totalOrders: 10,
            totalTodayOrders: 5,
        });
    });
    it("ws close action", () => {
        const action = wsClose();
        const newState = wsOrdersReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
        });
    });
});
