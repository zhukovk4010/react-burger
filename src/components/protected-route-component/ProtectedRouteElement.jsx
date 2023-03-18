import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../../utils/burger-api";
import { getCookie } from "../../utils/cookie";
import { setUserData } from "../../services/actions/user";
import { Navigate } from "react-router";
import PropTypes from "prop-types";

const ProtectedRouteElement = (props) => {
    const { auth } = useSelector((store) => ({
        auth: store.user.isAuthenticated,
    }));
    const dispatch = useDispatch();
    const [isUserLoaded, setUserLoaded] = useState(false);

    //Инициализируем пользователя
    const init = async () => {
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
            dispatch(setUserData(user.user.email, user.user.name));
            setUserLoaded(true);
        } catch (e) {
            setUserLoaded(true);
        }
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    if (!isUserLoaded) {
        return null;
    }
    return auth ? props.element : <Navigate to="/login" replace />;
};

ProtectedRouteElement.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
