import {
    getOrderAction,
    getOrderFailedAction,
    getOrderFromApiAction,
    getOrderSuccessAction,
    orderClear,
} from "../actions/order";
import orderReducer, { InitialStateType } from "./orderReducer";

const state: InitialStateType = {
    orderData: null,
    numberOrder: 0,
    isLoading: false,
    hasError: false,
    errorName: "",
};

describe("test order reducer", () => {
    it("get order action", () => {
        const action = getOrderAction();
        const newState = orderReducer(state, action);

        expect(newState).toEqual({
            ...state,
            isLoading: true,
        });
    });
    it("get order success action", () => {
        const action = getOrderSuccessAction(1);
        const newState = orderReducer(state, action);

        expect(newState).toEqual({
            ...state,
            numberOrder: 1,
        });
    });
    it("get order failed action", () => {
        const action = getOrderFailedAction("error");
        const newState = orderReducer(state, action);

        expect(newState).toEqual({
            ...state,
            hasError: true,
            errorName: "error",
        });
    });
    it("get order from api action", () => {
        const action = getOrderFromApiAction({
            _id: "6451520445c6f2001be70206",
            ingredients: [
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0946",
            ],
            status: "done",
            name: "Burger",
            createdAt: "2023-05-02T18:10:12.266Z",
            updatedAt: "2023-05-02T18:10:12.378Z",
            number: 1,
        });
        const newState = orderReducer(state, action);

        expect(newState).toEqual({
            ...state,
            orderData: {
                _id: "6451520445c6f2001be70206",
                ingredients: [
                    "643d69a5c3f7b9001cfa0941",
                    "643d69a5c3f7b9001cfa0946",
                ],
                status: "done",
                name: "Burger",
                createdAt: "2023-05-02T18:10:12.266Z",
                updatedAt: "2023-05-02T18:10:12.378Z",
                number: 1,
            },
        });
    });
    it("order clear action", () => {
        const action = orderClear();
        const newState = orderReducer(state, action);

        expect(newState).toEqual({
            ...state,
        });
    });
});
