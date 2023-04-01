//Тип ингредиента
export type IngredientType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

//Тип ингредиента в конструкторе
export type SelectedIngredientType = {
    ingredient: IngredientType;
    dragId: string;
};

//Тип данных, которые приходят после создания заказа
export type OrderType = {
    name: string;
    order: { number: number };
    success: boolean;
};
