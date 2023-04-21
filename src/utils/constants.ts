//Стили текста

export const TEXT_DEFAULT = "text text_type_main-default";
export const TEXT_LARGE = "text text_type_main-large";
export const TEXT_MEDIUM = "text text_type_main-medium";
export const TEXT_SMALL = "text text_type_main-small";
export const TEXT_INACTIVE_COLOR = "text_color_inactive";

export const DIGITS_LARGE = "text text_type_digits-large";
export const DIGITS_DEFAULT = "text text_type_digits-default";

//Типы actions
export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_FROM_API = "GET_ORDER_FROM_API";
export const ORDER_CLEAR = "ORDER_CLEAR";

export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";
export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL = "CLOSE_ORDER_DETAILS_MODAL";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const UPDATE_SELECTED_INGREDIENTS = "UPDATE_SELECTED_INGREDIENTS";
export const DELETE_SELECTED_INGREDIENT = "DELETE_SELECTED_INGREDIENT";
export const ADD_SELECTED_INGREDIENT = "ADD_SELECTED_INGREDIENT";
export const DELETE_SELECTED_INGREDIENT_MODAL =
    "DELETE_SELECTED_INGREDIENT_MODAL";
export const DELETE_SELECTED_INGREDIENTS = "DELETE_SELECTED_INGREDIENTS";

export const WS_CONNECT = "WS_CONNECT";
export const WS_CONNECTING = "WS_CONNECTING";
export const WS_OPEN = "WS_OPEN";
export const WS_CLOSE = "WS_CLOSE";
export const WS_MESSAGE = "WS_MESSAGE";
export const WS_ERROR = "WS_ERROR";

export const WS_URL = "wss://norma.nomoreparties.space/orders/all";
export const WS_URL_USER = "wss://norma.nomoreparties.space/orders";

//Авторизация
export const SET_USER_DATA = "SET_USER_DATA";
export const DELETE_USER_DATA = "DELETE_USER_DATA";
