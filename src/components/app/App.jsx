import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { closeIngredientModalAC } from "../../services/actions/modal";
import { deleteSelectedIngredient } from "../../services/actions/selectedIngredient";
import { setUserData } from "../../services/actions/user";
import { getIngredients } from "../../services/thunk/getIngredientsThunk";
import { getUserRequest } from "../../utils/burger-api";
import { getCookie } from "../../utils/cookie";

import AppHeader from "../app-header/AppHeader";
import IngredientDetails from "../main/burger-ingredients/ingredients-list/ingredient-details/IngredientDetails";
import Main from "../main/Main";
import Modal from "../modals/Modal";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import Login from "../pages/login/Login";
import NotFound404 from "../pages/not-found-404/NotFound404";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import ResetPassword from "../pages/reset-password/ResetPassword";
import ProtectedRouteElement from "../protected-route-component/ProtectedRouteElement";

const App = () => {
    const dispatch = useDispatch();

    //Инициализация пользователя, проверяем токен
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
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        dispatch(getIngredients());
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ModalSwitch = () => {
        const dispatch = useDispatch();
        const location = useLocation();
        const navigate = useNavigate();
        //Подложка для модального окна
        let background = location.state && location.state.background;

        const closeModal = () => {
            dispatch(closeIngredientModalAC());
            dispatch(deleteSelectedIngredient());
            navigate(-1);
        };
        return (
            <>
                <AppHeader />
                <Routes location={background || location}>
                    <Route path="/" element={<Main />}></Route>
                    <Route
                        path="/ingredients/:id"
                        element={<IngredientDetails />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRouteElement element={<Profile />} />
                        }
                    />
                    <Route
                        path="/profile/orders"
                        element={
                            <ProtectedRouteElement element={<Profile />} />
                        }
                    />
                    <Route path="*" element={<NotFound404 />} />
                </Routes>

                {background && (
                    <Routes>
                        <Route
                            path="/ingredients/:id"
                            element={
                                <Modal
                                    title="Детали ингредиента"
                                    onClose={closeModal}
                                >
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </>
        );
    };

    return (
        <BrowserRouter>
            <ModalSwitch />
        </BrowserRouter>
    );
};

export default App;
