import {
    getIngredientsAction,
    getIngredientsFailedAction,
    getIngredientsSuccessAction,
} from "../actions/ingredients";
import ingredientsReducer, { InitialStateType } from "./ingredientsReducer";

//Исходные данные
const state: InitialStateType = {
    ingredientsData: [],
    isLoading: false,
    hasError: false,
};

describe("test ingredients reducer", () => {
    it("get ingredients action", () => {
        const action = getIngredientsAction();
        const newState = ingredientsReducer(state, action);

        expect(newState).toEqual({
            ...state,
            isLoading: true,
            hasError: false,
        });
    });

    it("get ingredients failed action", () => {
        const action = getIngredientsFailedAction();
        const newState = ingredientsReducer(state, action);

        expect(newState).toEqual({
            ...state,
            isLoading: false,
            hasError: true,
        });
    });

    it("get ingredients success action", () => {
        const action = getIngredientsSuccessAction([
            {
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
            {
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
        ]);
        const newState = ingredientsReducer(state, action);
        expect(newState).toEqual({
            ...state,
            ingredientsData: [
                {
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
                {
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
            ],
            isLoading: false,
            hasError: false,
        });
    });
});
