import { DELETE_USER_DATA, SET_USER_DATA } from "../../utils/constants";

export const setUserData = (email, name) => ({
    type: SET_USER_DATA,
    name: name,
    email: email,
});

export const deleteUserData = () => ({
    type: DELETE_USER_DATA,
});
