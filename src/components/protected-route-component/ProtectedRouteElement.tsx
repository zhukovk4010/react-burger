//Защищенный маршрут
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/hooks";

type ProtectedRouteElementPropsType = {
    background?: Location;
    element: React.ReactNode;
    anonymous?: boolean;
};

const ProtectedRouteElement = ({
    background,
    element,
    anonymous = false,
}: ProtectedRouteElementPropsType) => {
    const { auth } = useAppSelector((state) => ({
        auth: state.user.isAuthenticated,
    }));
    const location = useLocation();

    if (background && !auth) {
        return null;
    }

    if (anonymous && auth) {
        const from = location.state?.from || "/";
        return <Navigate to={from} />;
    }

    if (!anonymous && !auth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <>{element}</>;
};

export default ProtectedRouteElement;
