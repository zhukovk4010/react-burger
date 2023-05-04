import {
    addBunAction,
    addSelectedIngredientAction,
    deleteSelectedIngredientAction,
    deleteSelectedIngredientsAction,
    updateSelectedIngredients,
} from "../actions/selectedIngredients";
import selectedIngredintsReducer, {
    InitialStateType,
} from "./selectedIngredientsReducer";

const state: InitialStateType = {
    selectedIngredientsData: [],
    selectedBun: null,
};

describe("test selected ingredients reducer", () => {
    it("add ingredient action", () => {
        const action = addSelectedIngredientAction({
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
        const newState = selectedIngredintsReducer(state, action);

        expect(newState.selectedIngredientsData.length).toBe(1);
    });

    it("add bun action", () => {
        const action = addBunAction({
            _id: "643d69a5c3f7b9001cfa093d",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 600,
            price: 2000,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile:
                "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large:
                "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0,
        });
        const newState = selectedIngredintsReducer(state, action);

        expect(newState).toEqual({
            ...state,
            selectedBun: {
                _id: "643d69a5c3f7b9001cfa093d",
                name: "Флюоресцентная булка R2-D3",
                type: "bun",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 600,
                price: 2000,
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                image_mobile:
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                image_large:
                    "https://code.s3.yandex.net/react/code/bun-01-large.png",
                __v: 0,
            },
        });
    });
    it("update selected ingredients action", () => {
        const action = updateSelectedIngredients([
            {
                ingredient: {
                    _id: "643d69a5c3f7b9001cfa093d",
                    name: "Флюоресцентная булка R2-D3",
                    type: "bun",
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 600,
                    price: 2000,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_mobile:
                        "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    image_large:
                        "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    __v: 0,
                },
                dragId: "0",
            },
            {
                ingredient: {
                    _id: "643d69a5c3f7b9001cfa093d",
                    name: "Флюоресцентная булка R2-D3",
                    type: "bun",
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 600,
                    price: 2000,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_mobile:
                        "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    image_large:
                        "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    __v: 0,
                },
                dragId: "1",
            },
        ]);
        const newState = selectedIngredintsReducer(state, action);

        expect(newState).toEqual({
            ...state,
            selectedIngredientsData: [
                {
                    ingredient: {
                        _id: "643d69a5c3f7b9001cfa093d",
                        name: "Флюоресцентная булка R2-D3",
                        type: "bun",
                        proteins: 44,
                        fat: 26,
                        carbohydrates: 85,
                        calories: 600,
                        price: 2000,
                        image: "https://code.s3.yandex.net/react/code/bun-01.png",
                        image_mobile:
                            "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        image_large:
                            "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        __v: 0,
                    },
                    dragId: "0",
                },
                {
                    ingredient: {
                        _id: "643d69a5c3f7b9001cfa093d",
                        name: "Флюоресцентная булка R2-D3",
                        type: "bun",
                        proteins: 44,
                        fat: 26,
                        carbohydrates: 85,
                        calories: 600,
                        price: 2000,
                        image: "https://code.s3.yandex.net/react/code/bun-01.png",
                        image_mobile:
                            "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        image_large:
                            "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        __v: 0,
                    },
                    dragId: "1",
                },
            ],
        });
    });
    it("delete selected ingredient", () => {
        const action = deleteSelectedIngredientAction([
            {
                ingredient: {
                    _id: "643d69a5c3f7b9001cfa093d",
                    name: "Флюоресцентная булка R2-D3",
                    type: "bun",
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 600,
                    price: 2000,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_mobile:
                        "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    image_large:
                        "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    __v: 0,
                },
                dragId: "0",
            },
            {
                ingredient: {
                    _id: "643d69a5c3f7b9001cfa093d",
                    name: "Флюоресцентная булка R2-D3",
                    type: "bun",
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 600,
                    price: 2000,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_mobile:
                        "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    image_large:
                        "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    __v: 0,
                },
                dragId: "1",
            },
        ]);
        const newState = selectedIngredintsReducer(state, action);

        expect(newState).toEqual({
            ...state,
            selectedIngredientsData: [
                {
                    ingredient: {
                        _id: "643d69a5c3f7b9001cfa093d",
                        name: "Флюоресцентная булка R2-D3",
                        type: "bun",
                        proteins: 44,
                        fat: 26,
                        carbohydrates: 85,
                        calories: 600,
                        price: 2000,
                        image: "https://code.s3.yandex.net/react/code/bun-01.png",
                        image_mobile:
                            "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        image_large:
                            "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        __v: 0,
                    },
                    dragId: "0",
                },
                {
                    ingredient: {
                        _id: "643d69a5c3f7b9001cfa093d",
                        name: "Флюоресцентная булка R2-D3",
                        type: "bun",
                        proteins: 44,
                        fat: 26,
                        carbohydrates: 85,
                        calories: 600,
                        price: 2000,
                        image: "https://code.s3.yandex.net/react/code/bun-01.png",
                        image_mobile:
                            "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        image_large:
                            "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        __v: 0,
                    },
                    dragId: "1",
                },
            ],
        });
    });
    it("delete selected ingredients action", () => {
        const action = deleteSelectedIngredientsAction();
        const newState = selectedIngredintsReducer(state, action);

        expect(newState).toEqual({ ...state });
    });
});
