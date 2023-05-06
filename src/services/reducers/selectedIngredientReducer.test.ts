import {
    addSelectedIngredientToModal,
    deleteSelectedIngredientToModal,
} from "../actions/selectedIngredient";
import selectedIngredientReducer, {
    initialState,
} from "./selectedIngredientReducer";
import { ingredient } from "./ingredientsReducer.test";

describe("test selected ingredient reducer", () => {
    it("add selected ingredient action", () => {
        const action = addSelectedIngredientToModal(ingredient);
        const newState = selectedIngredientReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            selectedIngredient: ingredient,
        });
    });
    it("delete selected ingredient action", () => {
        const action = deleteSelectedIngredientToModal();
        const newState = selectedIngredientReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
        });
    });
});
