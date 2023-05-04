import { deleteUserDataAction, setUserDataAction } from "../actions/user";
import authReducer, { InitialStateType } from "./userReducer";

const state: InitialStateType = {
    name: "",
    email: "",
    isAuthenticated: false,
};

describe("test user reducer", () => {
    it("set user data action", () => {
        const action = setUserDataAction("user@gmail.com", "user");
        const newState = authReducer(state, action);

        expect(newState).toEqual({
            ...state,
            name: "user",
            email: "user@gmail.com",
            isAuthenticated: true,
        });
    });
    it("delete user data action", () => {
        const action = deleteUserDataAction();
        const newState = authReducer(state, action);

        expect(newState).toEqual({
            ...state,
        });
    });
});
