import {
    closeIngredientModalAction,
    closeOrderDetailsModalAction,
    closeOrderModalAction,
    openIngredientModalAction,
    openOrderDetailsModalAction,
    openOrderModalAction,
} from "../actions/modal";
import modalReducer, { InitialStateType } from "./modalReducer";

const state: InitialStateType = {
    openIngredientDetailsModal: false,
    openOrderModal: false,
    openOrderDetailsModal: false,
};

describe("test modal reducer", () => {
    it("open ingredient modal action", () => {
        const action = openIngredientModalAction();
        const newState = modalReducer(state, action);

        expect(newState).toEqual({
            ...state,
            openIngredientDetailsModal: true,
        });
    });
    it("close ingredient modal action", () => {
        const action = closeIngredientModalAction();
        const newState = modalReducer(state, action);

        expect(newState).toEqual({
            ...state,
        });
    });
    it("open order modal action", () => {
        const action = openOrderModalAction();
        const newState = modalReducer(state, action);

        expect(newState).toEqual({
            ...state,
            openOrderModal: true,
        });
    });
    it("close order modal action", () => {
        const action = closeOrderModalAction();
        const newState = modalReducer(state, action);

        expect(newState).toEqual({
            ...state,
        });
    });
    it("open order details modal action", () => {
        const action = openOrderDetailsModalAction();
        const newState = modalReducer(state, action);

        expect(newState).toEqual({
            ...state,
            openOrderDetailsModal: true,
        });
    });
    it("close order details modal action", () => {
        const action = closeOrderDetailsModalAction();
        const newState = modalReducer(state, action);

        expect(newState).toEqual({
            ...state,
        });
    });
});
