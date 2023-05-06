import {
    closeIngredientModalAction,
    closeOrderDetailsModalAction,
    closeOrderModalAction,
    openIngredientModalAction,
    openOrderDetailsModalAction,
    openOrderModalAction,
} from "../actions/modal";
import modalReducer, { initialState } from "./modalReducer";

describe("test modal reducer", () => {
    it("open ingredient modal action", () => {
        const action = openIngredientModalAction();
        const newState = modalReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            openIngredientDetailsModal: true,
        });
    });
    it("close ingredient modal action", () => {
        const action = closeIngredientModalAction();
        const newState = modalReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
        });
    });
    it("open order modal action", () => {
        const action = openOrderModalAction();
        const newState = modalReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            openOrderModal: true,
        });
    });
    it("close order modal action", () => {
        const action = closeOrderModalAction();
        const newState = modalReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
        });
    });
    it("open order details modal action", () => {
        const action = openOrderDetailsModalAction();
        const newState = modalReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            openOrderDetailsModal: true,
        });
    });
    it("close order details modal action", () => {
        const action = closeOrderDetailsModalAction();
        const newState = modalReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
        });
    });
});
