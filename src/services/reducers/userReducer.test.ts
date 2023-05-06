import { deleteUserDataAction, setUserDataAction } from "../actions/user";
import authReducer, { initialState } from "./userReducer";

describe("test user reducer", () => {
    it("set user data action", () => {
        const action = setUserDataAction("user@gmail.com", "user");
        const newState = authReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
            name: "user",
            email: "user@gmail.com",
            isAuthenticated: true,
        });
    });
    it("delete user data action", () => {
        const action = deleteUserDataAction();
        const newState = authReducer(initialState, action);

        expect(newState).toEqual({
            ...initialState,
        });
    });
});
