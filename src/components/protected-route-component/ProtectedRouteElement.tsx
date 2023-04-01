import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../../utils/burgerApi";
import { getCookie } from "../../utils/cookie";
import { setUserDataAction } from "../../services/actions/user";
import { Navigate } from "react-router";
import { AppStateType } from "../../services/reducers/rootReducer";

type ProtectedRouteElementPropsType = {
    element: React.ReactNode;
};

const ProtectedRouteElement = ({ element }: ProtectedRouteElementPropsType) => {
    const { auth } = useSelector((state: AppStateType) => ({
        auth: state.user.isAuthenticated,
    }));
    const dispatch = useDispatch();
    const [isUserLoaded, setUserLoaded] = useState(false);

    //Инициализируем пользователя
    const init = useCallback(async () => {
        try {
            const user = await getUserRequest({
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    authorization: "Bearer " + getCookie("accessToken"),
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            dispatch(setUserDataAction(user.user.email, user.user.name));
            setUserLoaded(true);
        } catch (e) {
            setUserLoaded(true);
        }
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);

    if (!isUserLoaded) {
        return null;
    }
    return auth ? <>{element}</> : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
