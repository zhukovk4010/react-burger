import {
    getIngredientsAction,
    getIngredientsFailedAction,
    getIngredientsSuccessAction,
} from "../actions/ingredients";
import ingredientsReducer, { initialState } from "./ingredientsReducer";

//Исходные данные
export const ingredient = {
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
};

describe("test ingredients reducer", () => {
    it("get ingredients action", () => {
        const action = getIngredientsAction();
        const newState = ingredientsReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            isLoading: true,
            hasError: false,
        });
    });

    it("get ingredients failed action", () => {
        const action = getIngredientsFailedAction();
        const newState = ingredientsReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            isLoading: false,
            hasError: true,
        });
    });

    it("get ingredients success action", () => {
        const action = getIngredientsSuccessAction([ingredient, ingredient]);
        const newState = ingredientsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            ingredientsData: [ingredient, ingredient],
            isLoading: false,
            hasError: false,
        });
    });
});
