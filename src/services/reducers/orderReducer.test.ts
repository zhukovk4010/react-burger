import {
    getOrderAction,
    getOrderFailedAction,
    getOrderFromApiAction,
    getOrderSuccessAction,
    orderClear,
} from "../actions/order";
import orderReducer, { initialState } from "./orderReducer";

const order = {
    _id: "6451520445c6f2001be70206",
    ingredients: ["643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa0946"],
    status: "done",
    name: "Burger",
    createdAt: "2023-05-02T18:10:12.266Z",
    updatedAt: "2023-05-02T18:10:12.378Z",
    number: 1,
};

describe("test order reducer", () => {
    it("get order action", () => {
        const action = getOrderAction();
        const newState = orderReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            isLoading: true,
        });
    });
    it("get order success action", () => {
        const action = getOrderSuccessAction(1);
        const newState = orderReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            numberOrder: 1,
        });
    });
    it("get order failed action", () => {
        const action = getOrderFailedAction("error");
        const newState = orderReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            hasError: true,
            errorName: "error",
        });
    });
    it("get order from api action", () => {
        const action = getOrderFromApiAction(order);
        const newState = orderReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            orderData: order,
        });
    });
    it("order clear action", () => {
        const action = orderClear();
        const newState = orderReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
        });
    });
});
