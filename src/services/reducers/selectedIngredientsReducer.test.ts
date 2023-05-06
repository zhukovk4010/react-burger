import {
    addBunAction,
    addSelectedIngredientAction,
    deleteSelectedIngredientAction,
    deleteSelectedIngredientsAction,
    updateSelectedIngredients,
} from "../actions/selectedIngredients";
import selectedIngredintsReducer, {
    initialState,
} from "./selectedIngredientsReducer";
import { ingredient } from "./ingredientsReducer.test";

const bun = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 600,
    price: 2000,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
};

describe("test selected ingredients reducer", () => {
    it("add ingredient action", () => {
        const action = addSelectedIngredientAction(ingredient);
        const newState = selectedIngredintsReducer(initialState, action);

        expect(newState.selectedIngredientsData.length).toBe(1);
    });

    it("add bun action", () => {
        const action = addBunAction(bun);
        const newState = selectedIngredintsReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            selectedBun: bun,
        });
    });
    it("update selected ingredients action", () => {
        const action = updateSelectedIngredients([
            {
                ingredient: bun,
                dragId: "0",
            },
            {
                ingredient: bun,
                dragId: "1",
            },
        ]);
        const newState = selectedIngredintsReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            selectedIngredientsData: [
                {
                    ingredient: bun,
                    dragId: "0",
                },
                {
                    ingredient: bun,
                    dragId: "1",
                },
            ],
        });
    });
    it("delete selected ingredient", () => {
        const action = deleteSelectedIngredientAction([
            {
                ingredient: bun,
                dragId: "0",
            },
            {
                ingredient: bun,
                dragId: "1",
            },
        ]);
        const newState = selectedIngredintsReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            selectedIngredientsData: [
                {
                    ingredient: bun,
                    dragId: "0",
                },
                {
                    ingredient: bun,
                    dragId: "1",
                },
            ],
        });
    });
    it("delete selected ingredients action", () => {
        const action = deleteSelectedIngredientsAction();
        const newState = selectedIngredintsReducer(initialState, action);

        expect(newState).toEqual({ ...initialState });
    });
});
