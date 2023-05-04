import {
    addSelectedIngredientToModal,
    deleteSelectedIngredientToModal,
} from "../actions/selectedIngredient";
import selectedIngredientReducer, {
    InitialStateType,
} from "./selectedIngredientReducer";

const state: InitialStateType = {
    selectedIngredient: null,
};

describe("test selected ingredient reducer", () => {
    it("add selected ingredient action", () => {
        const action = addSelectedIngredientToModal({
            _id: "id",
            name: "Ingredient",
            type: "bun",
            proteins: 100,
            fat: 100,
            carbohydrates: 100,
            calories: 100,
            price: 100,
            image: "some link",
            image_large: "some link",
            image_mobile: "some link",
            __v: 1,
        });
        const newState = selectedIngredientReducer(state, action);

        expect(newState).toEqual({
            ...state,
            selectedIngredient: {
                _id: "id",
                name: "Ingredient",
                type: "bun",
                proteins: 100,
                fat: 100,
                carbohydrates: 100,
                calories: 100,
                price: 100,
                image: "some link",
                image_large: "some link",
                image_mobile: "some link",
                __v: 1,
            },
        });
    });
    it("delete selected ingredient action", () => {
        const action = deleteSelectedIngredientToModal();
        const newState = selectedIngredientReducer(state, action);

        expect(newState).toEqual({
            ...state,
        });
    });
});
