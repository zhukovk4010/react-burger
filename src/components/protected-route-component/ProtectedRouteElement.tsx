import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { AppStateType } from "../../services/reducers/rootReducer";

type ProtectedRouteElementPropsType = {
    element: React.ReactNode;
    anonymous?: boolean;
};

const ProtectedRouteElement = ({
    element,
    anonymous = false,
}: ProtectedRouteElementPropsType) => {
    const { auth } = useSelector((state: AppStateType) => ({
        auth: state.user.isAuthenticated,
    }));
    const location = useLocation();
    const from = location.state?.from || "/";

    if (anonymous && auth) {
        return <Navigate to={from} />;
    }

    if (!anonymous && !auth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <>{element}</>;
};

export default ProtectedRouteElement;
